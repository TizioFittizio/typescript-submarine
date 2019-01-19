import bodyParser = require('body-parser');
import express = require('express');
import { IOC } from '../services/IOC';
import { DummyController } from '../controllers/DummyController';

const { logService } = IOC.instance;

export class Server {

    private _app: express.Express;
    private server: any;
    private port: number;

    constructor(port: number){
        this._app = express();
        this.loadMiddlewares();
        this.loadRouters();
        this.port = port;
        this.server = null;
    }

    public start(){
        this.server = this.app.listen(this.port, () => {
            logService.log(`Started on port ${this.port}`);
        });
    }

    public async stop(){
        if (!this.server) throw new Error('Server not started');
        await this.server.close();
    }

    public get app(){
        return this._app;
    }

    private loadMiddlewares(){
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
    }

    private loadRouters(){
        this.app.use(new DummyController().getRouter());
    }

}