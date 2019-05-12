import { HostLoaderImp } from './../../models/implementations/HostLoaderImp';
import { Constants } from './../../config/Constants';
import { ConfigServiceImp } from '../../services';

it('should get host correctly', () => {
    process.env[Constants.CONFIG_KEY_MONGO_HOST] = 'asd';
    const hostLoader = new HostLoaderImp(new ConfigServiceImp());
    const host = hostLoader.getHost();
    expect(host).toBe('asd');
});

it('should throw without an host set', () => {
    process.env[Constants.CONFIG_KEY_MONGO_HOST] = '';
    const hostLoader = new HostLoaderImp(new ConfigServiceImp());
    expect(() => hostLoader.getHost()).toThrow();
});