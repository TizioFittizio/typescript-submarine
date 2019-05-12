import { ConfigService, LogService } from './interfaces';
import { ConfigServiceImp } from '.';
import { LogServiceImp } from './LogServiceImp';

export class IOC {

    private static _instance: IOC;

    private _configService: ConfigService;
    private _logService: LogService;

    private constructor(){
        this._configService = new ConfigServiceImp();
        this._logService = new LogServiceImp();
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