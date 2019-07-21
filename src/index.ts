import { Constants } from './config/Constants';
import { IOC } from './services';

const { configService, queueService } = IOC.instance;

export class Main {

    public static async main() {
        this.initServices();
        this.initQueue();
    }

    private static initServices(){
        configService.loadConfiguration();
    }

    private static initQueue(){
        queueService.init(
            Constants.CONFIG_KEY_AZURE_SERVICE_BUS_CONNECTION_STRING, 
            Constants.AZURE_SERVICE_BUS_QUEUE_NAME
        );
    }

}

Main.main();