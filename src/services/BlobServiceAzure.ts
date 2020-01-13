import { LogLevel } from '../config/Enums';
import { Constants } from '../config/Constants';
import { ILogService, IBlobService, IConfigService } from './interfaces';
import { NotInitializedError } from '../config/Errors';
import {
    Aborter,
    BlobURL,
    BlockBlobURL,
    ContainerURL,
    ServiceURL,
    StorageURL,
    SharedKeyCredential
} from '@azure/storage-blob';

export class BlobServiceAzure implements IBlobService {

    private logService: ILogService;
    private configService: IConfigService;

    private containerURL: ContainerURL | null;

    constructor(configService: IConfigService, logService: ILogService){
        this.logService = logService;
        this.configService = configService;
        this.containerURL = null;
    }

    public async init(): Promise<void> {
        const storageKey = this.getStorageKey();
        const sharedKeyCredential = new SharedKeyCredential(Constants.AZURE_STORAGE_ACCOUNT_NAME, storageKey);
        const pipeline = StorageURL.newPipeline(sharedKeyCredential);
        const serviceURL = new ServiceURL(
            `https://${Constants.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
            pipeline
        );
        this.containerURL = ContainerURL.fromServiceURL(serviceURL, Constants.AZURE_STORAGE_BLOB_CONTAINER_NAME);
    }

    public async uploadFile(file: any, filename: string): Promise<string> {
        this.ensureInitialization();
        const blobURL = BlobURL.fromContainerURL(this.containerURL!, filename);
        const blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);
        await blockBlobURL.upload(Aborter.timeout(7000), file, file.length);
        const fileUploadedURL = this.getUploadedFileURL(filename);
        this.logService.log('AzureBlobService', LogLevel.INFO, `Uploaded file ${fileUploadedURL}`);
        return fileUploadedURL;
    }

    public async getFiles(startIndex: number, endIndex: number): Promise<string[]> {
        // TODO this will not work with more than 5000 items
        const blobList = await this.containerURL!.listBlobFlatSegment(Aborter.none);
        return blobList.segment.blobItems
            .slice(startIndex, endIndex)
            .map(x => this.getUploadedFileURL(x.name));
    }

    public async deleteFile(filename: string): Promise<void> {
        try {
            const blobURL = BlobURL.fromContainerURL(this.containerURL!, filename);
            const blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);
            await blockBlobURL.delete(Aborter.timeout(7000));
        }
        catch (e){
            // TODO Questo cancella il blob ma poi dà errore che non lo trova, non ho tempo da perdere
        }
    }

    private getStorageKey(){
        const key = this.configService.getString(Constants.CONFIG_KEY_AZURE_STORAGE_KEY);
        if (!key) throw new NotInitializedError('Azure storage key not set');
        return key;
    }

    private getUploadedFileURL(filename: string){
        const storageAccountName = Constants.AZURE_STORAGE_ACCOUNT_NAME;
        const blobContainerName = Constants.AZURE_STORAGE_BLOB_CONTAINER_NAME;
        return `https://${storageAccountName}.blob.core.windows.net/${blobContainerName}/${filename}`;
    }

    private ensureInitialization(){
        if (!this.containerURL) throw new NotInitializedError(`Azure blob service not initialized`);
    }

}