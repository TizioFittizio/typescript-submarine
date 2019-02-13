import { IOC } from './services';

const { configService } = IOC.instance;

export class Main {

    public static async main() {
        this.initServices();
    }

    private static initServices(){
        configService.loadConfiguration();
    }

}

Main.main();