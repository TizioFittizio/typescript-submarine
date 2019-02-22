import { Constants } from '../../config/Constants';
import { HostLoader } from '../abstractions/HostLoader';
import { NotInitializedError } from '../../config/Errors';
import { IConfigService } from '../../services/interfaces';

export class HostLoaderImp implements HostLoader {

    private configService: IConfigService;

    constructor(configService: IConfigService){
        this.configService = configService;
    }

    public getHost(): string {
        const mongoHost = this.configService.getString(Constants.CONFIG_KEY_MONGO_HOST);
        if (!mongoHost) throw new NotInitializedError('Mongo host is not set');
        return mongoHost;
    }

}