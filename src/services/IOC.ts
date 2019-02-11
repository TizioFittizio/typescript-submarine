import { IConfigService } from './interfaces';
import { ConfigService } from '.';

export class IOC {

    private static _instance: IOC;

    private _configService: IConfigService;

    private constructor(){
        this._configService = new ConfigService();
    }

    public static get instance(){
        if (!this._instance) this._instance = new IOC();
        return this._instance;
    }

}