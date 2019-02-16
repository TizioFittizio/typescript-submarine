import * as request from 'supertest';
import { ServerImp } from '../../models/implementations/ServerImp';
import { Server } from '../../models/interfaces/Server';

let server: Server;

beforeAll(() => {
   server = new ServerImp();
   server.start();
});

afterAll(async () => {
    await server.stop();
});

describe('GET /users/', () => {

    it('should return an array of users', done => {
        request(server.getApp())
            .get('/users')
            .expect(res => {
                expect(Array.isArray(res.body)).toBeTruthy();
            })
            .expect(200)
            .end(done);
    });

});