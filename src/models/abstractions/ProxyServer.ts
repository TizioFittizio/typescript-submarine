export interface ProxyServer {
    start(): Promise<void>;
    stop(): Promise<void>;
    addProxy(proxyRule: string, target: string, ...middlewares: Array<() => void>): ProxyServer;
}