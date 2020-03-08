/* eslint-disable @typescript-eslint/no-magic-numbers */
import { DBServiceMongo } from '../../services/implementations/DBServiceMongo';
import * as mongoose from 'mongoose';
import { IOC } from '../../services/implementations/IOC';

const { logService, configService } = IOC.instance;

beforeAll(() => {
    configService.loadConfiguration();
});

it('should be able to connect and disconnect correctly', async() => {
    const mongoDbService = new DBServiceMongo(logService, configService);
    await mongoDbService.connect();
    expect(mongoose.connection.db.databaseName).toBe('test'); // db name in constants
    await mongoDbService.disconnect();
    expect(mongoose.connection.readyState).toBe(0);
});