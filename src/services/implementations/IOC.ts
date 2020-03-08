import { ConfigService, LogService } from '../interfaces';
import { ConfigServiceImp, LogServiceImp } from '.';

export class IOC {

    private static _instance: IOC;

    private _configService: ConfigService | null;

    private _logService: LogService | null;

    private constructor(){
        this._configService = null;
        this._logService = null;
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

}