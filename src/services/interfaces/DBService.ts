export interface DBService {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
}