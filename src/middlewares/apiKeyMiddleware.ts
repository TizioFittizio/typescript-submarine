import { NextFunction, Request, Response } from 'express';
import { Constants } from '../config/Constants';
import { IOC } from '../services/IOC';

const { configService } = IOC.instance;

export const apiKeyMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const key = req.header(Constants.HEADER_API_KEY);
        if (!key) {
            throw new Error('API key is missing');
        }
        if (key !== configService.getString(Constants.SECRET_KEY_API_KEY)) {
            throw new Error('API key is invalid');
        }
        return next();
    }
    catch (e){
        return res.status(400).send(e.message);
    }
};