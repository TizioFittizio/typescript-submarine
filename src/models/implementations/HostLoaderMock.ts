import { Constants } from './../../config/Constants';
import { HostLoader } from '../abstractions/HostLoader';

export class HostLoaderMock implements HostLoader {

    public getHost(): string {
        return Constants.MONGO_TEST_HOST;
    }

}