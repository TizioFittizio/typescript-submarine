export interface IBlobService {
    init(): Promise<void>;
    uploadFile(file: any, filename: string): Promise<string>;
}