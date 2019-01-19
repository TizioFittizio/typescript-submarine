import { Constants } from './../config/Constants';
import { IConfigService } from './interfaces/IConfigService';
import { isTestEnvironment } from '../helpers/isTestEnvironment';

export class ConfigService implements IConfigService {

    public loadConfig(){
        try {
            const file = require(Constants.PATH_FILE_SECRETS);
            Object.keys(file).forEach(key => this.setConfigVariable(key, file[key]));
        }
        catch (e){
            if (!isTestEnvironment()) console.log('Configuration not loaded at runtime');
        }
    }

    public setConfigVariable(key: string, value: string){
        process.env[key] = value;
    }

    public getString(key: string): string | null {
        const value = process.env[key];
        const result = value === 'undefined' || !value ? null : value;
        return result;
    }

    public getNumber(key: string): number | null {
        const value = process.env[key];
        const number = JSON.parse(value!);
        return number;
    }

    public getBoolean(key: string): boolean {
        const value = process.env[key];
        try {
            return value ? JSON.parse(value) === true : false;
        }
        catch (e){
            return false;
        }
    }

}