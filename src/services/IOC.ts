import { ConfigService, LogService, DBService } from './interfaces';
import { MongoDBService, LogServiceImp, ConfigServiceImp } from '.';
import { isTestEnvironment } from '../helpers/isTestEnvironment';
import { HostLoaderTest, HostLoaderImp } from '../models';

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
        if (!this._mongoService) this._mongoService = new MongoDBService(this.logService, this.hostLoader);
        return this._mongoService;
    }

    private get hostLoader(){
        return isTestEnvironment() ? new HostLoaderTest(this.configService) : new HostLoaderImp(this.configService);
    }

}