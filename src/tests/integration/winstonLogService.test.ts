import { LogLevel } from '../../config/Enums';
import { WinstonLogService } from './../../services/WinstonLogService';

const winstonLogServer = new WinstonLogService();
const logLevels = [
    LogLevel.DEBUG,
    LogLevel.INFO,
    LogLevel.WARN,
    LogLevel.ERROR,
    LogLevel.FATAL
];

it('should log all levels without throw', () => {
    for (const logLevel of logLevels){
        winstonLogServer.log('A', logLevel, 'B');
    }
});