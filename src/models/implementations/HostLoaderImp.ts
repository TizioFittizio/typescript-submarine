import { Constants } from '../../config/Constants';
import { HostLoader } from '../abstractions/HostLoader';
import { IOC } from '../../services';
import { NotInitializedError } from '../../config/Errors';

const { configService } = IOC.instance;

export class HostLoaderImp implements HostLoader {

    public getHost(): string {
        const mongoHost = configService.getString(Constants.CONFIG_KEY_MONGO_HOST);
        if (!mongoHost) throw new NotInitializedError('Mongo host is not set');
        return mongoHost;
    }

}