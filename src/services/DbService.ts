import { HostLoader } from './../models/abstractions/HostLoader';
import { IDbService } from './interfaces/IDbService';
import { ILogService } from './interfaces';
import * as mongoose from 'mongoose';
import { LogLevel } from '../config/Enums';

export class MongoDbService implements IDbService {

    private static readonly MONGOOSE_OPTIONS = {
        useNewUrlParser: true,
        userCreateIndex: true
    };

    private logService: ILogService;
    private hostLoader: HostLoader;

    constructor(logService: ILogService, hostLoader: HostLoader){
        this.logService = logService;
        this.hostLoader = hostLoader;
        (mongoose as any).Promise = global.Promise;
    }

    public async connect() {
        const mongoHost = this.hostLoader.getHost();
        await new Promise<void>((resolve, reject) => {
            mongoose.connect(mongoHost, MongoDbService.MONGOOSE_OPTIONS)
            .then(() => {
                this.logService.log('DbService', LogLevel.INFO, 'Db connected');
                resolve();
            })
            .catch(reject);
        });
    }

    public disconnect(): Promise<void> {
        throw new Error('Method not implemented.');
    }

}