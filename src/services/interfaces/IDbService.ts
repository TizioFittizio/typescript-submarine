export interface IDbService {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
}