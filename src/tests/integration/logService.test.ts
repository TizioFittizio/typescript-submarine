import { LogServiceImp } from '../../services/implementations';
import { LogLevel } from '../../config/Enums';

const logService = new LogServiceImp();
const callerName = 'Jest';
const testMessage = 'Message';
let logMessage: string;
let warnMessage: string;
let errorMessage: string;

beforeAll(() => {
    console.log = (message: string) => logMessage = message;
    console.warn = (message: string) => warnMessage = message;
    console.error = (message: string) => errorMessage = message;
});

beforeEach(() => {
    logMessage = '';
    warnMessage = '';
    errorMessage = '';
});

it('should log correctly a debug message', () => {
    logService.log(callerName, LogLevel.DEBUG, testMessage);
    expect(logMessage).toBe(`[D] ${callerName} - ${testMessage}`);
});

it('should log correctly an info message', () => {
    logService.log(callerName, LogLevel.INFO, testMessage);
    expect(logMessage).toBe(`[I] ${callerName} - ${testMessage}`);
});

it('should log correctly a warn message', () => {
    logService.log(callerName, LogLevel.WARN, testMessage);
    expect(warnMessage).toBe(`[W] ${callerName} - ${testMessage}`);
});

it('should log correctly an error message', () => {
    logService.log(callerName, LogLevel.ERROR, testMessage);
    expect(errorMessage).toBe(`[E] ${callerName} - ${testMessage}`);
});

it('should log correctly a fatal message', () => {
    logService.log(callerName, LogLevel.FATAL, testMessage);
    expect(errorMessage).toBe(`[F] ${callerName} - ${testMessage}`);
});