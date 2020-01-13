export interface IBlobService {
    init(): Promise<void>;
    uploadFile(file: any, filename: string): Promise<string>;
    deleteFile(filename: string): Promise<void>;
}