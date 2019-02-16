import {
    ServerLoader,
    ServerSettings,
    GlobalAcceptMimesMiddleware
} from '@tsed/common';
import { IOC } from '../../services';
import { LogLevel } from '../../config/Enums';
import { Server } from '../interfaces/Server';
import { Constants } from '../../config/Constants';

const { logService } = IOC.instance;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const rootDir = __dirname.split('src')[0] + 'src';

@ServerSettings({
    rootDir,
    acceptMimes: ['application/json'],
    httpPort: Constants.EXPRESS_HTTP_PORT,
    httpsPort: Constants.EXPRESS_HTTPS_PORT
})
export class ServerImp extends ServerLoader implements Server {

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

    public getApp(){
        return this.expressApp;
    }

    public async stop(){
        // Not needed
    }

}