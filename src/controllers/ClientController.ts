import { ExpressController, Get } from 'simple-express-ts';
import { Request, Response } from 'express';
import * as path from 'path';
import { sendErrorResponse } from '../helpers/sendErrorResponse';

@ExpressController('')
export class ClientController {

    @Get('/')
    private async getIndex(req: Request, res: Response){
        try {
            res.sendFile(path.join(__dirname, '../client/index.html'));
        }
        catch (e){
            this.handleError(e, res);
        }
    }

    @Get('*')
    private async getStaticFile(req: Request, res: Response){
        try {
            res.sendFile(path.join(__dirname, '../client/', req.path));
        }
        catch (e){
            this.handleError(e, res);
        }
    }

    private handleError(e: any, res: Response){
        e.status = 404;
        e.message = '';
        sendErrorResponse(e, res);
    }

}