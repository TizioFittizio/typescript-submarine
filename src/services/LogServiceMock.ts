import { ILogService } from './interfaces/ILogService';

// tslint:disable:no-empty
export class LogServiceMock implements ILogService {

    public log(...messages: string[]){

    }

    public warn(...messages: string[]){

    }

    public err(...messages: string[]){

    }

    public showProgress(){

    }

    public setProgress(message: string){

    }

    public hideProgress(){

    }

}