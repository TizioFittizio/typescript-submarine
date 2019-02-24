import { IOC } from './services';

const { configService, blobService } = IOC.instance;

export class Main {

    public static async main() {
        await this.initServices();
        const url = await blobService.uploadFile('Dockerfile', 'sda');
        console.log(url);
    }

    private static async initServices(){
        configService.loadConfiguration();
        await blobService.init();
    }

}

Main.main();