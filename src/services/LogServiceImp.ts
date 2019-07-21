import { LogService } from './interfaces';
import { LogLevel } from '../config/Enums';

export class LogServiceImp implements LogService {

    private static readonly LOG_LEVEL_CHAR_MAP = {
        [LogLevel.DEBUG]: 'D',
        [LogLevel.INFO]: 'I',
        [LogLevel.WARN]: 'W',
        [LogLevel.ERROR]: 'E',
        [LogLevel.FATAL]: 'F'
    };

    public log(callerName: string, logLevel: LogLevel, message: string){
        const logLevelChar = LogServiceImp.LOG_LEVEL_CHAR_MAP[logLevel];
        const logMessage = `[${logLevelChar}] ${callerName} - ${message}`;
        if (logLevel <= LogLevel.INFO) console.log(logMessage);
        else if (logLevel <= LogLevel.WARN) console.warn(logMessage);
        else console.error(logMessage);
    }

}