import { LogLevel } from 'config/Enums';

export interface ILogService {
    log: (callerName: string, logLevel: LogLevel, message: string) => void;
}