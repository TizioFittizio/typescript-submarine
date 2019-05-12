import { LogService } from './interfaces';
import { LogLevel } from '../config/Enums';
import { createLogger, format, transports, Logger } from 'winston';

type WinstonLogMethod = 'debug' | 'info' | 'warn' | 'error';

export class WinstonLogService implements LogService {

    private static readonly LOG_LEVEL_MAP: { [level: number]: WinstonLogMethod } = {
        [LogLevel.DEBUG]: 'debug',
        [LogLevel.INFO]: 'info',
        [LogLevel.WARN]: 'warn',
        [LogLevel.ERROR]: 'error',
        [LogLevel.FATAL]: 'error'
    };

    private logger: Logger;

    constructor(){
        this.logger = createLogger({
            level: 'info',
            format: format.combine(
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                format.errors({ stack: true }),
                format.splat(),
                format.json(),
                format.prettyPrint()
            ),
            defaultMeta: { service: 'submarine' },
            transports: [
                new transports.Console(),
                new transports.File({ filename: 'error.log', level: 'error' }),
                new transports.File({ filename: 'info.log' })
            ]
        });
    }

    public log(callerName: string, logLevel: LogLevel, message: string){
        const method = this.getLogMethodNameByLevel(logLevel);
        const messageToLog = `${callerName} - ${message}`;
        this.logger[method](messageToLog);
    }

    private getLogMethodNameByLevel(logLevel: LogLevel): WinstonLogMethod {
        return WinstonLogService.LOG_LEVEL_MAP[logLevel];
    }

}