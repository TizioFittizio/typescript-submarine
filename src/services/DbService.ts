import mongoose = require('mongoose');
import { Constants } from './../config/Constants';
import { IConfigService } from './interfaces/IConfigService';
import { IDbService } from './interfaces/IDbService';
import { ILogService } from './interfaces/ILogService';
import { isTestEnvironment } from '../helpers/isTestEnvironment';

export class DbService implements IDbService {

    private logService: ILogService;
    private configService: IConfigService;

    constructor(logService: ILogService, configService: IConfigService){
        mongoose.Promise = global.Promise;
        this.logService = logService;
        this.configService = configService;
    }

    public async connect(){
        const mongoUri = this.getMongoUri();
        return await new Promise<void>((resolve, reject) => {
            mongoose.connect(mongoUri, {useNewUrlParser: true, useCreateIndex: true})
            .then(() => resolve())
            .catch(reject);
        });
    }

    public async disconnect(){
        await mongoose.disconnect();
    }

    private getMongoUri(){
        return `mongodb://${this.getMongoHost()}:27017/${this.getMongoDbName()}`;
    }

    private getMongoHost(){
        const mongoUri = this.configService.getString(Constants.SECRET_KEY_MONGO_HOST);
        if (!mongoUri) throw new Error('MongoHost not found');
        return mongoUri;
    }

    private getMongoDbName(){
        return isTestEnvironment() ? 'WeCooklyUserServiceTest' : 'WeCooklyUserService';
    }

}