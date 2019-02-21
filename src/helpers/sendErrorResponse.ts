import { Response } from 'express';

export const sendErrorResponse = (err: Error, res: Response) => {
    const status = (err as any).status || 400;
    res.status(status).send(err.message);
};