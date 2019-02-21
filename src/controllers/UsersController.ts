import { ExpressController, Get } from 'simple-express-ts';
import { Request, Response } from 'express';

export class UsersController extends ExpressController {

    protected controllerRoute: string = '/users';

    @Get('')
    private async get(req: Request, res: Response){
        res.send([
            {
                id: '1'
            },
            {
                id: '2'
            }
        ]);
    }

}