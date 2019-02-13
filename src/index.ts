import { IOC } from './services';
import { ServerImpl } from './models/implementations/ServerImpl';

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
        new ServerImpl().start();
    }

}

Main.main();