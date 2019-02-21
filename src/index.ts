import { UsersController } from './controllers/UsersController';
import { Constants } from './config/Constants';
import { IOC } from './services';
import { ExpressServer } from 'simple-express-ts';

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
        const server = new ExpressServer.Builder(Constants.SERVER_PORT)
            .setControllers(UsersController)
            .build();
        await server.start();
    }

}

Main.main();