export interface ILogService {
    log: (...messages: string[]) => void;
    warn: (...messages: string[]) => void;
    err: (...messages: string[]) => void;
    showProgress: () => void;
    setProgress: (message: string) => void;
    hideProgress: () => void;
}