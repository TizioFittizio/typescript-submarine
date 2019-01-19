import * as request from 'supertest';
import { Server } from '../models/Server';
import { getRandomPort } from '../helpers/getRandomPort';

let app: any;
let server: Server;

beforeAll(() => {
    server = new Server(getRandomPort());
    app = server.app;
    server.start();
});

afterAll(async () => {
    await server.stop();
});

const route = '/dummy';

describe('GET /test', () => {
    it('should respond correctly', done => {
        request(app)
            .get(route + '/test')
            .expect(200)
            .end(done);
    });
});

describe('GET /testPath', () => {
    it('should respond with correct id', done => {
        request(app)
            .get(route + '/testPath/1')
            .expect('1')
            .end(done);
    });
});

// tslint:disable-next-line:no-identical-functions
describe('GET /testQuery', () => {
    // tslint:disable-next-line:no-identical-functions
    it('should respond with correct queryParam', done => {
        request(app)
            .get(route + '/testQuery?id=1')
            .expect('1')
            .end(done);
    });
});

describe('POST /testBody', () => {
    it('should respond with correct body', done => {
        request(app)
            .post(route + '/testBody')
            .send({id: '1'})
            .expect({id: '1'})
            .end(done);
    });
});

describe('POST /testHeader', () => {
    it('should respond with correct header', done => {
        request(app)
            .post(route + '/testHeader')
            .set('id', '1')
            .expect('1')
            .end(done);
    });
});