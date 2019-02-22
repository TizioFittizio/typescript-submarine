import { IConfigService, ILogService, IDbService } from './interfaces';
import { LogService, ConfigService, MongoDbService } from '.';
import { isTestEnvironment } from '../helpers/isTestEnvironment';
import { HostLoaderMock, HostLoaderImp } from '../models';

export class IOC {

    private static _instance: IOC;

    private _configService: IConfigService;
    private _logService: ILogService;
    private _dbService: IDbService;

    private constructor(){
        this._configService = new ConfigService();
        this._logService = new LogService();
        this._dbService = new MongoDbService(this.logService, this.hostLoader);
    }

    public static get instance(){
        if (!this._instance) this._instance = new IOC();
        return this._instance;
    }

    public get configService(){
        return this._configService;
    }

    public get logService(){
        return this._logService;
    }

    public get dbService(){
        return this._dbService;
    }

    private get hostLoader(){
        return isTestEnvironment() ? new HostLoaderMock() : new HostLoaderImp(this.configService);
    }

}