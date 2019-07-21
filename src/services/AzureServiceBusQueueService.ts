import { NotInitializedError } from '../config/Errors';
import {
    ServiceBusClient,
    SendableMessageInfo,
    ReceiveMode,
    Sender,
    Receiver,
    QueueClient
} from '@azure/service-bus';
import { LogLevel } from '../config/Enums';
import { QueueService, ConfigService, LogService } from './interfaces';

export class AzureServiceBusQueueService<MessageSendType, MessageReceiveType>
implements QueueService<MessageSendType, MessageReceiveType> {

    private configService: ConfigService;
    private logService: LogService;

    private serviceBusClient: ServiceBusClient | null;
    private queueClient: QueueClient | null;

    private sender: Sender | null;
    private receiver: Receiver | null;

    private onErrorCallback: (error: any) => void;

    constructor(configService: ConfigService, logService: LogService){
        this.configService = configService;
        this.logService = logService;
        this.serviceBusClient = null;
        this.queueClient = null;
        this.sender = null;
        this.receiver = null;
        this.onErrorCallback = (e) => this.logService.log('AzureServiceBus', LogLevel.ERROR, e.message);
    }

    public init(connectionStringConfigKey: string, queueName: string): void {
        const connectionString = this.configService.getString(connectionStringConfigKey);
        if (!connectionString) throw new NotInitializedError('Connection string for service bus not set');
        this.serviceBusClient = ServiceBusClient.createFromConnectionString(connectionString);
        this.queueClient = this.serviceBusClient.createQueueClient(queueName);
    }

    public async startSender(): Promise<void> {
        this.ensureInitialized();
        this.sender = this.queueClient!.createSender();
    }

    public async startReceiver(): Promise<void> {
        this.ensureInitialized();
        this.receiver = this.queueClient!.createReceiver(ReceiveMode.receiveAndDelete);
    }

    public async sendMessage(message: MessageSendType): Promise<void> {
        if (!this.sender) throw new Error('Sender not started');
        try {
            const messageToSend: SendableMessageInfo = { body: message };
            await this.sender.send(messageToSend);
        }
        catch (e){
            this.onErrorCallback(e);
        }
    }

    public setOnRecieveMessageCallback(callback: (message: MessageReceiveType) => Promise<void>): void {
        if (!this.receiver) throw new Error('Receiver not started');
        try {
            this.receiver.registerMessageHandler(callback as any, this.onErrorCallback);
        }
        catch (e){
            this.onErrorCallback(e);
        }
    }

    public setOnErrorCallback(callback: (error: any) => Promise<void>): void {
        this.onErrorCallback = callback;
    }

    public async close(): Promise<void> {
        this.ensureInitialized();
        if (this.sender) await this.sender.close();
        if (this.receiver) await this.receiver.close();
        await this.queueClient!.close();
        await this.serviceBusClient!.close();
    }

    private ensureInitialized(){
        if (!this.serviceBusClient || !this.queueClient) {
            throw new NotInitializedError('Azure service bus not initialized');
        }
    }

}