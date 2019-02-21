import { HostLoaderImp } from './../../models/implementations/HostLoaderImp';
import { Constants } from './../../config/Constants';

it('should get host correctly', () => {
    process.env[Constants.CONFIG_KEY_MONGO_HOST] = 'asd';
    const hostLoader = new HostLoaderImp();
    const host = hostLoader.getHost();
    expect(host).toBe('asd');
});

it('should throw without an host set', () => {
    process.env[Constants.CONFIG_KEY_MONGO_HOST] = '';
    const hostLoader = new HostLoaderImp();
    expect(() => hostLoader.getHost()).toThrow();
});