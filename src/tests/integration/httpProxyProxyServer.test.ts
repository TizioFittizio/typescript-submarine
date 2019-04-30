import { ProxyServer } from './../../models/abstractions/ProxyServer';
import { HttpProxyProxyServer } from './../../models/implementations/HttpProxyProxyServer';
import * as http from 'http';
import axios from 'axios';

// Axios Cross origin http://localhost forbidden workaround
axios.defaults.adapter = require('axios/lib/adapters/http');

const createServer = (port: number, message?: string) => {
    const server = http.createServer((req, res) => {
        if (req.url === '/customHeader/route') res.write(req.headers['x-custom-header']);
        else res.write(message || req.url);
        res.end();
    });
    server.listen(port);
    return server;
};

const wait = async (time: number) => new Promise(resolve => {
    setTimeout(resolve, time);
});

describe('With a proxy server with no rules', () => {

    let proxyServer: ProxyServer;

    beforeAll(async () => {
        proxyServer = new HttpProxyProxyServer(20000);
        await proxyServer.start();
    });

    afterAll(async () => {
        await proxyServer.stop();
        await wait(500);
    });

    it('should throw when no proxy rule are matched', async () => {
        await expect(axios.get('http://localhost:20000')).rejects.toThrow();
    });

});

describe('When using proxy rules', () => {

    let proxyServer: ProxyServer;
    let rule1Server: http.Server;
    let rule2Server: http.Server;

    beforeAll(async () => {
        proxyServer = new HttpProxyProxyServer(10000);
        proxyServer.addProxyRule(/^\/rule1/, 'http://localhost:11111');
        proxyServer.addProxyRule(/^\/rule\d/, 'http://localhost:22222');
        rule1Server = createServer(11111, 'rule1');
        rule2Server = createServer(22222, 'rule2');
        await proxyServer.start();
    });

    afterAll(async () => {
        await new Promise(resolve => {
            rule1Server.close(() => {
                rule2Server.close(resolve);
            });
        });
        await proxyServer.stop();
        await wait(500);
    });

    it('should execute a proxy rule correctly', async () => {
        const response = await axios.get('http://localhost:10000/rule7');
        expect(response.data).toBe('rule2');
    });

    it('should execute a proxy rule before another', async () => {
        const response = await axios.get('http://localhost:10000/rule1');
        expect(response.data).toBe('rule1');
    });

});

describe('When using middlewares', () => {

    let proxyServer: ProxyServer;
    let rule1Server: http.Server;

    beforeAll(async () => {
        proxyServer = new HttpProxyProxyServer(30000);
        const middleware1 = (req: http.IncomingMessage, res: http.ServerResponse ) => {
            req.url += '/route';
            req.headers['x-custom-header'] = 'middleware';
        };
        const middleware2 = (req: http.IncomingMessage, res: http.ServerResponse ) => {
            if (req.url!.includes('$')){
                res.writeHead(400, { 'Content-Type': 'text/html' });
                res.write('Invalid url');
                res.end();
            }
        };
        proxyServer.addProxyRule(/^\/.*/, 'http://localhost:30001', middleware1, middleware2);
        rule1Server = createServer(30001);
        await proxyServer.start();
    });

    afterAll(async () => {
        await proxyServer.stop();
        await wait(500);
        await new Promise(resolve => {
            rule1Server.close(resolve);
        });
        await wait(500);
    });

    it('should execute middlewares correctly', async () => {
        const response = await axios.get('http://localhost:30000/rule!!!');
        expect(response.data).toBe('/rule!!!/route');
    });

    it('should execute middlewares that modify headers correctly', async () => {
        const response = await axios.get('http://localhost:30000/customHeader');
        expect(response.data).toBe('middleware');
    });

    it('should execute middleware that stop requests correctly', async () => {
        await expect(axios.get('http://localhost:30000/$')).rejects.toThrow();
    });

});