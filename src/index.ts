import { ServerImp } from './models/implementations/ServerImp';
import { Constants } from './config/Constants';
import { IOC } from './services/implementations';

const { configService } = IOC.instance;

export class Main {

    public async main() {
        this.initServices();
        await this.startServer();
    }

    private initServices(){
        configService.loadConfiguration();
    }

    private async startServer(){
        const server = new ServerImp(Constants.SERVER_PORT);
        await server.start();
    }

}

new Main().main().catch(e => console.error(e));