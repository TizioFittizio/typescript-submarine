import { Constants } from './../../config/Constants';
import { ServerImp } from './../../models/implementations/ServerImp';
import { Response } from 'supertest';

const request = require('supertest');

let server: ServerImp;
const apiKey = '1';

beforeAll(async () => {
    process.env[Constants.CONFIG_KEY_API_KEY] = apiKey;
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
            .set(Constants.HEADER_API_KEY, apiKey)
            .expect((res: Response) => {
                expect(Array.isArray(res.body)).toBeTruthy();
            })
            .expect(200)
            .end(done);
    });

});

describe('GET /users/:id', () => {

    it('should obtain user correctly', done => {
        request(server.getApp())
            .get('/users/10')
            .set(Constants.HEADER_API_KEY, apiKey)
            .expect((res: Response) => {
                expect(res.body.id).toBe('10');
            })
            .expect(200)
            .end(done);
    });

    it('should return 404 for an user not found', done => {
        request(server.getApp())
            .get('/users/234')
            .set(Constants.HEADER_API_KEY, apiKey)
            .expect(404)
            .end(done);
    });

});

describe('POST /users', () => {

    it('should create an user correctly', done => {
        request(server.getApp())
            .post('/users')
            .set(Constants.HEADER_API_KEY, apiKey)
            .send({ id: 299 })
            .expect(201)
            .end(done);
    });

    it('should return 400 for an incorrect body', done => {
        request(server.getApp())
            .post('/users')
            .set(Constants.HEADER_API_KEY, apiKey)
            .send({ })
            .expect(400)
            .end(done);
    });

});