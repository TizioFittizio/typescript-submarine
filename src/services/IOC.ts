import { IConfigService, ILogService } from './interfaces';
import { ConfigService } from '.';
import { LogService } from './LogService';

export class IOC {

    private static _instance: IOC;

    private _configService: IConfigService;
    private _logService: ILogService;

    private constructor(){
        this._configService = new ConfigService();
        this._logService = new LogService();
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

}