import { IOC } from '../../services';

const iocInstance = IOC.instance;

it('should obaint instance twice correctly', () => {
    expect(IOC.instance).toBeTruthy();
});

it('should obtain logService correctly', () => {
    expect(iocInstance.configService).toBeTruthy();
});

it('should obtain configService correctly', () => {
    expect(iocInstance.logService).toBeTruthy();
});