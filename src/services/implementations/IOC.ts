import { ConfigService, LogService, DBService } from '../interfaces';
import { DBServiceMongo, LogServiceImp, ConfigServiceImp } from '.';

export class IOC {

    private static _instance: IOC;

    private _configService: ConfigService | null;

    private _logService: LogService | null;

    private _mongoService: DBService | null;

    private constructor(){
        this._configService = null;
        this._logService = null;
        this._mongoService = null;
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

    public get dbService(){
        if (!this._mongoService) this._mongoService = new DBServiceMongo(this.logService, this.configService);
        return this._mongoService;
    }

}