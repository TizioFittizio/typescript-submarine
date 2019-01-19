import { Request, Response } from 'express';
import { BaseController, IRoute } from './BaseController';

export class DummyController extends BaseController {

    protected readonly routes: IRoute[] = [
        {
            url: '/test',
            method: 'get',
            action: this.test
        },
        {
            url: '/testPath/:id',
            method: 'get',
            action: this.testPathParams
        },
        {
            url: '/testQuery',
            method: 'get',
            action: this.testQueryParams
        },
        {
            url: '/testBody',
            method: 'post',
            action: this.testBodyParams
        },
        {
            url: '/testHeader',
            method: 'post',
            action: this.testHeaders
        }
    ];

    constructor(){
        super('dummy');
        this.setupRoutes();
    }

    private test(req: Request, res: Response){
        res.sendStatus(200);
    }

    private testPathParams(req: Request, res: Response){
        res.send(req.params.id);
    }

    private testQueryParams(req: Request, res: Response){
        res.send(req.query.id);
    }

    private testBodyParams(req: Request, res: Response){
        res.send(req.body);
    }

    private testHeaders(req: Request, res: Response){
        res.send(req.headers.id);
    }

}