import { IOC } from './services';
import { ServerImp } from './models/implementations/ServerImp';

const { configService } = IOC.instance;

export class Main {

    public static async main() {
        this.initServices();
        this.startServer();
    }

    private static initServices(){
        configService.loadConfiguration();
    }

    private static startServer(){
        new ServerImp().start();
    }

}

Main.main();