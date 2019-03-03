import { IOC } from './services';

const { configService, queueService } = IOC.instance;

export class Main {

    public static async main() {
        this.initServices();
    }

    private static initServices(){
        configService.loadConfiguration();
        queueService.init();
    }

}

Main.main();