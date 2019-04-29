import { Constants } from './../../config/Constants';
import { ProxyServer } from './../abstractions/ProxyServer';
import * as http from 'http';
import * as httpProxy from 'http-proxy';

interface ProxyRule {
    urlRule: RegExp;
    hostTarget: string;
    middlewares: Array<(req: any, res: any) => void>;
}

export class HttpProxyProxyServer implements ProxyServer {

    private port: number;
    private proxyRules: ProxyRule[];

    private httpProxy: httpProxy;
    private httpServer: null | http.Server;

    constructor(port: number){
        this.port = port;
        this.proxyRules = [];
        this.httpProxy = httpProxy.createProxyServer({
            secure: false, // To enable on production
            changeOrigin: true 
        });
        this.httpServer = null;
    }

    public async start(): Promise<void> {
        return new Promise((resolve) => {
            this.httpServer = http.createServer((req, res) => {
                for (const proxyRule of this.proxyRules){
                    if (req.url!.match(proxyRule.urlRule)){
                        proxyRule.middlewares.forEach(x => x(req, res));
                        this.httpProxy.web(req, res, {
                            target: proxyRule.hostTarget,
                            timeout: Constants.PROXY_TIMEOUT,
                            proxyTimeout: Constants.PROXY_TIMEOUT,
                            hostRewrite: '/',
                            autoRewrite: true
                        });
                        return;
                    }
                }
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write('No proxy rule matched');
                res.end();
            });
            this.httpServer.listen(this.port);
            console.log(`Proxy server started on port ${this.port}`);
            resolve();
        });
    }

    public async stop(): Promise<void> {
        if (!this.httpServer) console.warn('Proxy server not started');
        else return await new Promise((resolve, reject) => {
            this.httpProxy.close(() => this.httpServer!.close((e) => {
                if (e) reject(e);
                else resolve();
            }));
        });
    }

    public addProxyRule(
        urlRule: RegExp,
        hostTarget: string,
        ...middlewares: Array<(req: any, res: any) => void>): ProxyServer {
        this.proxyRules.push({ urlRule, hostTarget, middlewares });
        return this;
    }

}