import { HttpProxyProxyServer } from './models/implementations/HttpProxyProxyServer';
import { IOC } from './services';

const { configService } = IOC.instance;

export class Main {

    public static async main() {
        this.initServices();
        await this.startProxyServer();
    }

    private static initServices(){
        configService.loadConfiguration();
    }

    private static async startProxyServer(){
        const proxyServer = new HttpProxyProxyServer(4444);
        proxyServer.addProxyRule(
            /^\/todos/, 'https://jsonplaceholder.typicode.com');
        proxyServer.addProxyRule(
            /^\/projects/, 'https://24pullrequests.com/',
            (req, res) => req.url += '.json');
        proxyServer.addProxyRule(
            /\/.+/, 'https://httpbin.org/anything',
            (req, res) => req.headers['x-custom-header'] = 'anything');
        await proxyServer.start();
    }

}

Main.main();