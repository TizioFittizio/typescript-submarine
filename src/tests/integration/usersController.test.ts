import { ServerImp } from './../../models/implementations/ServerImp';
import * as request from 'supertest';

let server: ServerImp;

beforeAll(async () => {
    server = new ServerImp(3000);
    server.start();
});

afterAll(async () => {
    server.stop();
});

describe('GET /users', () => {

    it('should obtain users correctly', done => {
        request(server.getApp())
            .get('/users')
            .expect(res => {
                expect(Array.isArray(res.body)).toBeTruthy();
            })
            .expect(200)
            .end(done);
    });

});