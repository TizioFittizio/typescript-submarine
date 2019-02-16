import { IConfigService } from './interfaces';
import { Constants } from '../config/Constants';

export class ConfigService implements IConfigService {

    public loadConfiguration(): void {
        try {
            const file = require(Constants.CONFIG_FILE_PATH);
            Object.keys(file).forEach(key => process.env[key] = file[key]);
        }
        catch (e){
            // Assuming environment variables already loaded
        }
    }

    public getString(configKey: string): string | null {
        const value = process.env[configKey];
        return value || null;
    }

    public getNumber(configKey: string): number | null {
        const value = process.env[configKey];
        if (value !== '0' && !value) return null;
        const parsedValue = Number(value);
        if (isNaN(parsedValue)) throw new Error(`Can\'t parse to number ${value}`);
        return parsedValue;
    }

    public getBoolean(configKey: string): boolean | null {
        const value = process.env[configKey];
        if (value !== 'false' && !value) return null;
        if (value !== 'false' && value !== 'true') throw new Error(`Can\'t parse to boolean ${value}`);
        return value === 'true';
    }

}