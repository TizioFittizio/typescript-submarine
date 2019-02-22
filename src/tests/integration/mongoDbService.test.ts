import { HostLoaderMock } from './../../models/implementations/HostLoaderMock';
import { MongoDbService } from './../../services/MongoDbService';
import { IOC } from '../../services';
import * as mongoose from 'mongoose';

const { logService } = IOC.instance;

it('should be able to connect and disconnect correctly', async () => {
    const mongoDbService = new MongoDbService(logService, new HostLoaderMock());
    await mongoDbService.connect();
    expect(mongoose.connection.db.databaseName).toBe('test'); // db name in constants
    await mongoDbService.disconnect();
    expect(mongoose.connection.readyState).toBe(0);
});