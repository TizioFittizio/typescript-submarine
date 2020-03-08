import { IOC } from './services/implementations';

const { configService } = IOC.instance;

export class Main {

    public main() {
        this.initServices();
    }

    private initServices(){
        configService.loadConfiguration();
    }

}

new Main().main();