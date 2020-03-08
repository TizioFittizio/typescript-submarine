/* eslint-disable @typescript-eslint/no-magic-numbers */
import { ConfigServiceImp } from '../../services/ConfigServiceImp';

// tslint:disable:no-duplicate-string

const configService = new ConfigServiceImp();

describe('When loading configurations', () => {
    it('should not throw', () => {
        configService.loadConfiguration();
    });
});

beforeEach(() => {
    delete process.env.key1;
    delete process.env.key2;
    delete process.env.key3;
    delete process.env.key4;
});

describe('When getting a string', () => {
    it('should return a string with an existing configuration', () => {
        process.env.key1 = '12';
        const key1Value = configService.getString('key1');
        expect(key1Value).toBe('12');
    });

    it('should return null with a not existing configuration', () => {
        const key2Value = configService.getString('key2');
        expect(key2Value).toBeNull();
    });

    it('should return value with orThrow method', () => {
        process.env.key1 = '12';
        const key1Value = configService.getStringOrThrow('key1');
        expect(key1Value).toBe('12');
    });

    it('should throw when using orThrow method with a null value', () => {
        expect(() => configService.getStringOrThrow('key2')).toThrow();
    });
});

describe('When getting a number', () => {
    it('should return a number with an existing configuration', () => {
        process.env.key1 = '12';
        const key1Value = configService.getNumber('key1');
        expect(key1Value).toBe(12);
    });

    it('should throw for configuration not being a number', () => {
        process.env.key2 = 'wd';
        expect(() => configService.getNumber('key2')).toThrow();
    });

    it('should return null with a not existing configuration', () => {
        const key3Value = configService.getNumber('key3');
        expect(key3Value).toBeNull();
    });

    it('should return 0 with a configuration with value 0', () => {
        process.env.key4 = '0';
        const key4Value = configService.getNumber('key4');
        expect(key4Value).toBe(0);
    });

    it('should return value with orThrow method', () => {
        process.env.key1 = '12';
        const key1Value = configService.getNumberOrThrow('key1');
        expect(key1Value).toBe(12);
    });

    it('should throw when using orThrow method with null value', () => {
        expect(() => configService.getNumberOrThrow('key3')).toThrow();
    });
});

describe('When getting a boolean', () => {
    it('should return true with a configuration with value true', () => {
        process.env.key1 = 'true';
        const key1Value = configService.getBoolean('key1');
        expect(key1Value).toBe(true);
    });

    it('should return false with a configuration with value false', () => {
        process.env.key2 = 'false';
        const key2Value = configService.getBoolean('key2');
        expect(key2Value).toBe(false);
    });

    it('should throw for a configuration not being a boolean', () => {
        process.env.key3 = '59';
        expect(() => configService.getBoolean('key3')).toThrow();
    });

    it('should return null with a not existing configuration', () => {
        const key4Value = configService.getBoolean('key4');
        expect(key4Value).toBeNull();
    });

    it('should return value with orThrow method', () => {
        process.env.key1 = 'true';
        const key1Value = configService.getBooleanOrThrow('key1');
        expect(key1Value).toBe(true);
    });

    it('should throw when using orThrow method with null value', () => {
        expect(() => configService.getBooleanOrThrow('key4')).toThrow();
    });
});