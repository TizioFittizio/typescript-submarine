import { IOC } from './services';

const { configService, blobService } = IOC.instance;

export class Main {

    public static async main() {
        await this.initServices();
        blobService.uploadFile('Dockerfile', 'sda');
    }

    private static async initServices(){
        configService.loadConfiguration();
        await blobService.init();
    }

}

Main.main();