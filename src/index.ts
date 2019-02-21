import { ServerImp } from './models/implementations/ServerImp';
import { Constants } from './config/Constants';
import { IOC } from './services';

const { configService } = IOC.instance;

export class Main {

    public static async main() {
        this.initServices();
        await this.startServer();
    }

    private static initServices(){
        configService.loadConfiguration();
    }

    private static async startServer(){
        const server = new ServerImp(Constants.SERVER_PORT);
        await server.start();
    }

}

Main.main();