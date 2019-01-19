import { Constants } from './config/Constants';
import { Server } from './models/Server';
import { IOC } from './services/IOC';

const { logService, configService, dbService} = IOC.instance;

export class Main {

    public static async main(){
        this.printInfo();
        this.loadSecrets();
        await this.startServices();
        this.startServer();
    }

    private static printInfo(){
        if (process.env.NODE_ENV !== 'test'){
            logService.log(`NUSTOX - wecookly-recipe-server`);
        }
    }

    private static loadSecrets(){
        configService.loadConfig();
    }

    private static async startServices(){
        try {
            await dbService.connect();
        }
        catch (e){
            logService.err(`Can\'t start services: ${e.message}`);
            process.exit(1);
        }
    }

    private static startServer(){
        const server = new Server(Constants.EXPRESS_PORT);
        server.start();
    }

}

Main.main();