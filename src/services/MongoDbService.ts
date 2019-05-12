import { HostLoader } from '../models/abstractions/HostLoader';
import * as mongoose from 'mongoose';
import { LogService, DBService } from './interfaces';
import { LogLevel } from '../config/Enums';

export class MongoDBService implements DBService {

    private static readonly MONGOOSE_OPTIONS = {
        useNewUrlParser: true,
        useCreateIndex: true
    };

    private logService: LogService;
    private hostLoader: HostLoader;

    constructor(logService: LogService, hostLoader: HostLoader){
        this.logService = logService;
        this.hostLoader = hostLoader;
        (mongoose as any).Promise = global.Promise;
    }

    public async connect() {
        const mongoHost = this.hostLoader.getHost();
        await new Promise<void>((resolve, reject) => {
            mongoose.connect(mongoHost, MongoDBService.MONGOOSE_OPTIONS)
            .then(() => {
                this.logService.log('DbService', LogLevel.INFO, 'Db connected');
                resolve();
            })
            .catch(reject);
        });
    }

    public async disconnect(): Promise<void> {
        await mongoose.disconnect();
    }

}