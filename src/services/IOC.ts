import {
    ConfigService,
    LogService,
    QueueService
} from './interfaces';
import {
    ConfigServiceImp,
    LogServiceImp,
    AzureServiceBusQueueService
} from './';
import { QueueMessage } from '../models/abstractions/QueueMessage';

export class IOC {

    private static _instance: IOC;

    private _configService: ConfigService | null;
    private _logService: LogService | null;
    private _queueService: QueueService<QueueMessage, QueueMessage> | null;

    private constructor(){
        this._configService = null;
        this._logService = null;
        this._queueService = null;
    }

    public static get instance(){
        if (!this._instance) this._instance = new IOC();
        return this._instance;
    }

    public get configService(){
        if (!this._configService) this._configService = new ConfigServiceImp();
        return this._configService;
    }

    public get logService(){
        if (!this._logService) this._logService = new LogServiceImp();
        return this._logService;
    }

    public get queueService(){
        if (!this._queueService) this._queueService =
            new AzureServiceBusQueueService(this.configService, this.logService);
        return this._queueService;
    }

}