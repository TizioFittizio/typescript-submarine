import {
    ServerLoader,
    ServerSettings,
    GlobalAcceptMimesMiddleware
} from '@tsed/common';
import { IOC } from '../../services';
import { LogLevel } from '../../config/Enums';
import { Server } from '../../models/interfaces/Server';

const { logService } = IOC.instance;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const rootDir = __dirname;

@ServerSettings({
    rootDir,
    acceptMimes: ['application/json']
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