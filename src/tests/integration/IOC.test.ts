/* eslint-disable @typescript-eslint/no-magic-numbers */
import { IOC } from '../../services/implementations';

const iocInstance = IOC.instance;

it('should obtain instance twice correctly', () => {
    expect(IOC.instance).toBeTruthy();
});

it('should obtain logService correctly', () => {
    for (let i = 0;i < 2;i++) expect(iocInstance.configService).toBeTruthy();
});

it('should obtain configService correctly', () => {
    for (let i = 0;i < 2;i++) expect(iocInstance.logService).toBeTruthy();
});