import { Constants } from '../../config/Constants';
import { HostLoader } from '../abstractions/HostLoader';
import { IConfigService } from '../../services/interfaces';
import { NotInitializedError } from '../../config/Errors';

export class HostLoaderTest implements HostLoader {

    private configService: IConfigService;

    constructor(configService: IConfigService){
        this.configService = configService;
    }

    public getHost(): string {
        const mongoHost = this.configService.getString(Constants.CONFIG_KEY_MONGO_HOST_TEST);
        if (!mongoHost) throw new NotInitializedError('Mongo host test is not set');
        return mongoHost;
    }

}