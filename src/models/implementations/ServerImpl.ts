import {
    ServerLoader,
    ServerSettings,
    GlobalAcceptMimesMiddleware
} from '@tsed/common';
import { IOC } from '../../services';
import { LogLevel } from '../../config/Enums';
import { Server } from '../../models/interfaces/Server';
import { Constants } from '../../config/Constants';

const { logService, configService } = IOC.instance;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const rootDir = __dirname.split('src')[0] + 'src';

@ServerSettings({
    rootDir,
    acceptMimes: ['application/json'],
    httpPort: configService.getNumber(Constants.SECRET_KEY_SERVER_PORT)!,
    httpsPort: configService.getNumber(Constants.SECRET_KEY_SERVER_PORT)!
})
export class ServerImpl extends ServerLoader implements Server {

    private static readonly ROOT_DIR = __dirname;

    public $onMountingMiddlewares(): void | Promise<any> {
        this
          .use(GlobalAcceptMimesMiddleware)
          .use(cookieParser())
          .use(compress({ }))
          .use(methodOverride())
          .use(bodyParser.json())
          .use(bodyParser.urlencoded({
            extended: true
          }));
    }

    public $onReady(){
        logService.log('Server', LogLevel.INFO, 'Server started');
    }

    public $onServerInitError(err: any){
        logService.log('Server', LogLevel.ERROR, JSON.stringify(err));
    }

}