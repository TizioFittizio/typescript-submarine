import { Constants } from './../config/Constants';
import { IDbService } from './interfaces/IDbService';
import { ILogService, IConfigService } from './interfaces';
import * as mongoose from 'mongoose';

export class DbService implements IDbService {

    private logService: ILogService;
    private configService: IConfigService;

    constructor(logService: ILogService, configService: IConfigService){
        this.logService = logService;
        this.configService = configService;
        (mongoose as any).Promise = global.Promise;
    }

    public connect(): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public disconnect(): Promise<void> {
        throw new Error('Method not implemented.');
    }

    private getMongoHost(){
        const mongoHost = this.configService.getString(Constants.CONFIG_KEY_MONGO_HOST);
        // TODO
    }

}