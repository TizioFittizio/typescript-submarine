import { ICacheService } from './interfaces/ICacheService';

export class RedisCacheService implements ICacheService {

    public async init(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async set(key: string, value: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async get<T>(key: string): Promise<T | null> {
        throw new Error("Method not implemented.");
    }

    public async delete(key: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async hashSet(key: string, field: string, value: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async hashGet<T>(key: string, field: string): Promise<T | null> {
        throw new Error("Method not implemented.");
    }

    public async hashDelete(key: string, field: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}