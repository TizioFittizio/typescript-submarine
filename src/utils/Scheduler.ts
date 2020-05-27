import { NotInitializedError } from '../config/Errors';

export class Scheduler {

    private timeMillis: number;
    private callback: () => Promise<void>;
    private executing: boolean;
    private timer: NodeJS.Timeout | null;

    public constructor(timeMillis: number, callback: () => Promise<void>){
        this.timeMillis = timeMillis;
        this.callback = callback;
        this.executing = false;
        this.timer = null;
    }

    public start(){
        this.timer = setInterval(async () => {
            if (!this.executing){
                this.executing = true;
                await this.callback();
                this.executing = false;
            }
        }, this.timeMillis);
    }

    public stop(){
        if (!this.timer) throw new NotInitializedError(`Attempting to stop not initialized timer`);
        clearInterval(this.timer);
    }

}