/* eslint-disable no-extra-parens */
import * as mongoose from 'mongoose';
import { LogService, DBService, ConfigService } from '../interfaces';
import { LogLevel } from '../../config/Enums';
import { isTestEnvironment } from '../../helpers/isTestEnvironment';
import { Constants } from '../../config/Constants';

export class DBServiceMongo implements DBService {

    private static readonly MONGOOSE_OPTIONS = {
        useNewUrlParser: true,
        useCreateIndex: true
    };

    private readonly logService: LogService;

    private readonly configService: ConfigService;

    public constructor(logService: LogService, configService: ConfigService){
        this.logService = logService;
        this.configService = configService;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mongoose as any).Promise = global.Promise;
    }

    public async connect() {
        const mongoHost = this.getMongoHost();
        await new Promise<void>((resolve, reject) => {
            mongoose.connect(mongoHost, DBServiceMongo.MONGOOSE_OPTIONS)
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

    private getMongoHost(){
        return this.configService.getStringOrThrow(isTestEnvironment()
            ? Constants.CONFIG_KEY_MONGO_HOST_TEST
            : Constants.CONFIG_KEY_MONGO_HOST);
    }

}