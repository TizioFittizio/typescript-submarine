import { IOC } from './services/implementations/IOC';

const { configService, dbService } = IOC.instance;

export class Main {

    public async main(){
        try {
            await this.initServices();
        }
        catch (e){
            console.error(e);
        }
    }

    private async initServices(){
        configService.loadConfiguration();
        await dbService.connect();
    }

}

new Main().main().catch(e => console.error(e));