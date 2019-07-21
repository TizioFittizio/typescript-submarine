import { MissingValueError, NotInitializedError, WrongCredentialsError } from './../config/Errors';
import { Constants } from './../config/Constants';
import { Request, Response, NextFunction } from 'express';
import { sendErrorResponse } from '../helpers/sendErrorResponse';
import { ConfigService } from '../services/interfaces/ConfigService';

export const apiKeyMiddleware = (configService: ConfigService) => (req: Request, res: Response, next: NextFunction) => {
    try {
        const apiKeyConfig = getApiKeyFromConfig(configService);
        const apiKeyRequest = getApiKeyFromRequest(req);
        if (apiKeyConfig !== apiKeyRequest) throw new WrongCredentialsError('Invalid API key');
        else next();
    }
    catch (e){
        sendErrorResponse(e, res);
    }
};

const getApiKeyFromConfig = (configService: ConfigService) => {
    const apiKey = configService.getString(Constants.CONFIG_KEY_API_KEY);
    if (!apiKey) throw new NotInitializedError('API key not set');
    return apiKey;
};

const getApiKeyFromRequest = (req: Request) => {
    const apiKey = req.header(Constants.HEADER_API_KEY);
    if (!apiKey) throw new MissingValueError('API key is missing');
    return apiKey;
};