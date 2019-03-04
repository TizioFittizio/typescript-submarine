export interface ICacheService {
    init(): Promise<void>;
    set(key: string, value: any): Promise<void>;
    get<T>(key: string): Promise<T | null>;
    delete(key: string): Promise<void>;
    hashSet(key: string, field: string, value: any): Promise<void>;
    hashGet<T>(key: string, field: string): Promise<T | null>;
    hashDelete(key: string, field: string): Promise<void>;
}