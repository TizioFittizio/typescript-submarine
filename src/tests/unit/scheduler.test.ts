import { Scheduler } from '../../utils/Scheduler';

const wait = async (timeMillis: number) => {
    await new Promise(resolve => {
        setTimeout(resolve, timeMillis);
    });
};

describe('When started', () => {

    let signals = [];

    beforeEach(() => {
        signals = [];
    });

    it('should execute function every x correctly', async () => {
        const scheduler = new Scheduler(400, async () => signals.push(true) as any);
        scheduler.start();
        await wait(1000);
        expect(signals.length).toBe(2);
        scheduler.stop();
    });

    it('should not execute overlapping functions', async () => {
        const scheduler = new Scheduler(200, async () => {
            await wait(500);
            signals.push(true);
        });
        scheduler.start();
        await wait(800);
        expect(signals.length).toBe(1);
        scheduler.stop();
    });

});

describe('When stopped', () => {

    let signals = [];

    beforeEach(() => {
        signals = [];
    });

    it('should be stopped correctly', async () => {
        const scheduler = new Scheduler(400, async () => signals.push(true) as any);
        scheduler.start();
        await wait(500);
        scheduler.stop();
        await wait(500);
        expect(signals.length).toBe(1);
    });

    it('should throw with a timer not started', () => {
        const scheduler = new Scheduler(400, async () => signals.push(true) as any);
        expect(() => scheduler.stop()).toThrow();
    });

});