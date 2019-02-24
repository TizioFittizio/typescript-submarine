import { Constants } from './../config/Constants';
import { IConfigService } from './interfaces/IConfigService';
import { IBlobService } from './interfaces/IBlobService';
import * as azureStorage from 'azure-storage';
import { ILogService } from './interfaces';
import { NotInitializedError } from '../config/Errors';

export class AzureBlobService implements IBlobService {

    private logService: ILogService;
    private configService: IConfigService;

    private blobService: azureStorage.BlobService | null;

    constructor(logService: ILogService, configService: IConfigService){
        this.blobService = null;
        this.logService = logService;
        this.configService = configService;
    }

    public async init(): Promise<void> {
        const connectionsString = this.configService.getString(Constants.CONFIG_KEY_AZURE_STORAGE_CONNECTION_STRING);
        if (!connectionsString){
            throw new NotInitializedError('Azure storage connection string is missing');
        }
        this.blobService = azureStorage.createBlobService(connectionsString);
        await new Promise((resolve, reject) => {
            this.blobService!.createContainerIfNotExists(
                Constants.STORAGE_CONTAINER_NAME,
                (error, result, response) => {
                    if (error) reject(error);
                    else resolve();
                }
            );
        });
    }

    public async uploadFile(file: any, filename: string): Promise<string> {
        this.ensureInitialization();
        this.blobService!.createBlockBlobFromLocalFile(
            Constants.STORAGE_CONTAINER_NAME,
            filename,
            file,
            (error, result, response) => {
                console.log('Error', error);
                console.log('Result', result);
                console.log('Response', response);
            }
        );
        return '';
    }

    private ensureInitialization(){
        if (!this.blobService){
            throw new NotInitializedError('AzureBlobService not initialized');
        }
    }

}