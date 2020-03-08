export interface Server {
    start(): Promise<void>;
    stop(): Promise<void>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getApp(): any;
}