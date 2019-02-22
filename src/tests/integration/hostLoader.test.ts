import { HostLoaderImp } from './../../models/implementations/HostLoaderImp';
import { Constants } from './../../config/Constants';
import { ConfigService } from '../../services';

it('should get host correctly', () => {
    process.env[Constants.CONFIG_KEY_MONGO_HOST] = 'asd';
    const hostLoader = new HostLoaderImp(new ConfigService());
    const host = hostLoader.getHost();
    expect(host).toBe('asd');
});

it('should throw without an host set', () => {
    process.env[Constants.CONFIG_KEY_MONGO_HOST] = '';
    const hostLoader = new HostLoaderImp(new ConfigService());
    expect(() => hostLoader.getHost()).toThrow();
});