import { NextFunction, Request, Response } from 'express';
import { Constants } from '../config/Constants';

export interface IUserIdRequest extends Request {
    userId: string;
}

export const userIdMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.header(Constants.HEADER_USER_ID);
        if (!userId) throw new Error('UserID is missing');
        (req as any).userId = userId;
        next();
    }
    catch (e) {
        res.status(400).send(e.message);
    }
};