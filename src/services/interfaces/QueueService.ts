export interface QueueService<MessageSendType, MessageReceiveType> {
    init(connectionStringConfigKey: string, queueName: string): void;
    startSender(): Promise<void>;
    startReceiver(): Promise<void>;
    sendMessage(message: MessageSendType): Promise<void>;
    setOnRecieveMessageCallback(callback: (message: MessageReceiveType) => Promise<void>): void;
    setOnErrorCallback(callback: (error: any) => Promise<void>): void;
    close(): Promise<void>;
}