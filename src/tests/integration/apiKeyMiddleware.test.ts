import { Constants } from './../../config/Constants';
import { apiKeyMiddleware } from './../../middlewares/apiKeyMiddleware';
import { ExpressController, Get, Middleware, ExpressServer } from 'simple-express-ts';
import { Request, Response } from 'express';
import * as request from 'supertest';

class TestController extends ExpressController {

    protected controllerRoute: string = '/test';

    @Get('')
    @Middleware(apiKeyMiddleware)
    private async test(req: Request, res: Response){
        res.sendStatus(200);
    }

}

let server: ExpressServer;

beforeAll(async () => {
    server = new ExpressServer.Builder(9876)
        .setControllers(TestController)
        .build();
    await server.start();
});

afterAll(async () => {
    await server.stop();
});

it('should return 500 when api key is not initialized', done => {
    process.env[Constants.CONFIG_KEY_API_KEY] = '';
    request(server.app)
        .get('/test')
        .set(Constants.HEADER_API_KEY, '123')
        .expect(500)
        .end(done);
});

it('should return 400 without api key', done => {
    process.env[Constants.CONFIG_KEY_API_KEY] = '123';
    request(server.app)
        .get('/test')
        .expect(400)
        .end(done);
});

it('should return 401 with wrong api key', done => {
    process.env[Constants.CONFIG_KEY_API_KEY] = '123';
    request(server.app)
        .get('/test')
        .set(Constants.HEADER_API_KEY, '321')
        .expect(401)
        .end(done);
});

it('should pass with correct api key', done => {
    process.env[Constants.CONFIG_KEY_API_KEY] = '379';
    request(server.app)
        .get('/test')
        .set(Constants.HEADER_API_KEY, '379')
        .expect(200)
        .end(done);
});