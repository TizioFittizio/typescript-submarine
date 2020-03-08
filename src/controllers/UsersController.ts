/* eslint-disable @typescript-eslint/no-magic-numbers */
import { MissingValueError } from './../config/Errors';
import { apiKeyMiddleware } from './../middlewares/apiKeyMiddleware';
import { ExpressController, Get, Middleware, Post, Put } from 'simple-express-ts';
import { Request, Response } from 'express';
import { sendErrorResponse } from '../helpers/sendErrorResponse';
import { NotFoundError } from '../config/Errors';
import { ConfigServiceImp } from '../services/implementations';

@ExpressController('/users')
export class UsersController {

    @Get('')
    @Middleware(apiKeyMiddleware(new ConfigServiceImp()))
    private async get(req: Request, res: Response){
        try {
            res.send([{ id: '1' }, { id: '2' }]);
        }
        catch (e){
            sendErrorResponse(e, res);
        }
    }

    @Get('/:id')
    @Middleware(apiKeyMiddleware(new ConfigServiceImp()))
    private async getId(req: Request, res: Response){
        try {
            const { id } = req.params;
            if (Number(id) > 10) throw new NotFoundError(`User with id ${id} not found`);
            res.send({ id });
        }
        catch (e){
            sendErrorResponse(e, res);
        }
    }

    @Post('')
    @Middleware(apiKeyMiddleware(new ConfigServiceImp()))
    private async create(req: Request, res: Response){
        try {
            const { id } = req.body;
            if (!id) throw new MissingValueError('Id parameter is missing');
            res.sendStatus(201);
        }
        catch (e){
            sendErrorResponse(e, res);
        }
    }

}