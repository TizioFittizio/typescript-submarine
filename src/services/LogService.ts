import { ILogService } from './interfaces/ILogService';

export class LogService implements ILogService {

    private showingProgress: boolean;

    constructor(){
        this.showingProgress = false;
    }

    public log(...messages: string[]){
        console.log(...messages);
    }

    public warn(...messages: string[]){
        console.warn(...messages);
    }

    public err(...messages: string[]){
        console.error(...messages);
    }

    public showProgress(){
        this.showingProgress = true;
    }

    public setProgress(message: string){
        console.log(message);
    }

    public hideProgress(){
        this.showingProgress = false;
    }

}