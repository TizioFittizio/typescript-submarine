import { isTestEnvironment } from '../helpers/isTestEnvironment';
import { ConfigService } from './ConfigService';
import { DbService } from './DbService';
import { IConfigService } from './interfaces/IConfigService';
import { IDbService } from './interfaces/IDbService';
import { ILogService } from './interfaces/ILogService';
import { LogService } from './LogService';
import { LogServiceMock } from './LogServiceMock';

export class IOC {

    private static _instance: IOC;

    private _logService: ILogService;
    private _configService: IConfigService;
    private _dbService: IDbService;

    constructor(){
        this._configService = new ConfigService();
        this._logService = isTestEnvironment() ?
            new LogServiceMock() :
            new LogService();
        this._dbService = new DbService(this.logService, this.configService);
    }

    public static get instance(){
        if (!IOC._instance) IOC._instance = new IOC();
        return this._instance;
    }

    public get logService(){
        return this._logService;
    }

    public get configService(){
        return this._configService;
    }

    public get dbService(){
        return this._dbService;
    }

}