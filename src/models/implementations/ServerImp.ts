import { Server } from './../abstractions/Server';
import { ExpressServer } from 'simple-express-ts';
import { UsersController } from '../../controllers/UsersController';
import bodyParser = require('body-parser');
import helmet = require('helmet');
import { ClientController } from '../../controllers/ClientController';

export class ServerImp implements Server {

    private expressServer: ExpressServer;

    constructor(port: number) {
        this.expressServer = new ExpressServer({
            port,
            controllers: [
                ClientController,
                UsersController
            ],
            middlewares: [
                helmet(),
                bodyParser.json(),
                bodyParser.urlencoded({ extended: true })
            ]
        });
    }

    public async start(): Promise<void> {
        await this.expressServer.start();
    }

    public async stop(): Promise<void> {
        await this.expressServer.stop();
    }

    public getApp() {
        return this.expressServer.app;
    }

}
