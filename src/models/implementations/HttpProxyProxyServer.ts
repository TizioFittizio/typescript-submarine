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

    private proxyRules: ProxyRule[];

    private httpProxy: httpProxy;
    private httpServer: null | http.Server;

    constructor(){
        this.proxyRules = [];
        this.httpProxy = httpProxy.createProxyServer({ });
        this.httpServer = null;
    }

    public async start(port: number): Promise<void> {
        return new Promise((resolve) => {
            this.httpServer = http.createServer((req, res) => {
                for (const proxyRule of this.proxyRules){
                    if (req.url!.match(proxyRule.urlRule)){
                        proxyRule.middlewares.forEach(x => x(req, res));
                        this.httpProxy.web(req, res, {
                            target: proxyRule.hostTarget,
                            timeout: Constants.PROXY_TIMEOUT,
                            proxyTimeout: Constants.PROXY_TIMEOUT
                        });
                    }
                }
                throw new Error('No proxy rule matched');
            });
            this.httpServer.listen(port);
            resolve();
        });
    }

    public async stop(): Promise<void> {
        if (!this.httpServer) console.warn('Proxy server not started');
        else return new Promise((resolve, reject) => {
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