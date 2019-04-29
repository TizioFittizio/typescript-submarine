export interface ProxyServer {
    start(port: number): Promise<void>;
    stop(): Promise<void>;
    addProxyRule(urlRule: RegExp, hostTarget: string, ...middlewares: Array<(req: any, res: any) => void>): ProxyServer;
}