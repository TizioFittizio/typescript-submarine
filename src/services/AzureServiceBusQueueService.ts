import { IQueueService } from './interfaces/IQueueService';
import { IConfigService, ILogService } from './interfaces';
import { Constants } from '../config/Constants';
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

export class AzureServiceBusQueueService implements IQueueService {

    private logService: ILogService;
    private configService: IConfigService;

    private serviceBusClient: ServiceBusClient | null;
    private queueClient: QueueClient | null;

    private sender: Sender | null;
    private receiver: Receiver | null;

    private onErrorCallback: (error: any) => void;

    constructor(logService: ILogService, configService: IConfigService){
        this.configService = configService;
        this.logService = logService;
        this.serviceBusClient = null;
        this.queueClient = null;
        this.sender = null;
        this.receiver = null;
        this.onErrorCallback = (e) => this.logService.log('AzureServiceBus', LogLevel.ERROR, e.message);
    }

    public init(): void {
        const connectionString = this.configService.getString(Constants.CONFIG_KEY_AZURE_SERVICE_BUS_CONNECTION_STRING);
        if (!connectionString) throw new NotInitializedError('Azure service bus connection string not set');
        this.serviceBusClient = ServiceBusClient.createFromConnectionString(connectionString);
        this.queueClient = this.serviceBusClient.createQueueClient(Constants.AZURE_SERVICE_BUS_QUEUE_NAME);
    }

    public async startSender(): Promise<void> {
        this.ensureInitialized();
        this.sender = this.queueClient!.createSender();
    }

    public async startReceiver(): Promise<void> {
        this.ensureInitialized();
        this.receiver = this.queueClient!.createReceiver(ReceiveMode.receiveAndDelete);
    }

    public async sendMessage(message: any): Promise<void> {
        if (!this.sender) throw new Error('Sender not started');
        try {
            const messageToSend: SendableMessageInfo = { body: message };
            await this.sender.send(messageToSend);
        }
        catch (e){
            this.onErrorCallback(e);
        }
    }

    public setOnRecieveMessageCallback(callback: (message: any) => Promise<void>): void {
        if (!this.receiver) throw new Error('Receiver not started');
        try {
            this.receiver.registerMessageHandler(callback, this.onErrorCallback);
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