export interface IQueueService {
    init(): void;
    start(): Promise<void>;
    sendMessage(message: any): Promise<void>;
    setOnRecieveMessageCallback(callback: (message: any) => Promise<void>): void;
    setOnErrorCallback(callback: (error: any) => Promise<void>): void;
    close(): Promise<void>;
}