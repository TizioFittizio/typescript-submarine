import { IQueueService } from './interfaces/IQueueService';
import { OnMessage, OnError, Namespace, Receiver, QueueClient, Sender } from '@azure/service-bus';
import { IConfigService, ILogService } from './interfaces';
import { Constants } from '../config/Constants';
import { NotInitializedError } from '../config/Errors';

export class AzureServiceBusQueueService implements IQueueService {

    private logService: ILogService;
    private configService: IConfigService;

    private namespace: Namespace | null;
    private client: QueueClient | null;
    private receiver: Receiver | null;
    private sender: Sender | null;
    private onMessageCallback: OnMessage;
    private onErrorCallback: OnError;

    private started: boolean;

    constructor(logService: ILogService, configService: IConfigService){
        this.logService = logService;
        this.configService = configService;
        this.namespace = null;
        this.client = null;
        this.receiver = null;
        this.sender = null;
        this.onMessageCallback = async () => { throw new NotInitializedError('On message callback not implemented'); };
        this.onErrorCallback = async () => { throw new NotInitializedError('On error callback not implemented'); };
        this.started = false;
    }

    public init(): void {
        const connectionString = this.getConnectionString();
        this.namespace = Namespace.createFromConnectionString(connectionString);
        this.client = this.namespace.createQueueClient(Constants.AZURE_SERVICE_BUS_QUEUE_NAME);
        this.receiver = this.client.getReceiver();
        this.sender = this.client.getSender();
    }

    public async start(): Promise<void> {
        if (!this.receiver) throw new NotInitializedError('Queue service hasn\'t been initialized');
        this.receiver.receive(this.onMessageCallback, this.onErrorCallback, { autoComplete: true });
        this.started = true;
    }

    public async sendMessage(message: any): Promise<void> {
        this.ensureStarted();
        this.sender!.send(message);
    }

    public setOnRecieveMessageCallback(callback: OnMessage): void {
        this.onMessageCallback = callback;
    }

    public setOnErrorCallback(callback: OnError): void {
        this.onErrorCallback = callback;
    }

    public async close(): Promise<void> {
        this.ensureStarted();
        this.receiver!.close();
        this.client!.close();
        this.namespace!.close();
    }

    private getConnectionString(){
        const connectionString = this.configService.getString(Constants.CONFIG_KEY_AZURE_SERVICE_BUS_CONNECTION_STRING);
        if (!connectionString) throw new NotInitializedError('Azure service bus connection string not set');
        return connectionString;
    }

    private ensureStarted(){
        if (!this.started) throw new NotInitializedError('Queue service hasn\'t be started');
    }

}