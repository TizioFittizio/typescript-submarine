import { IUserIdRequest } from './../middlewares/userIdMiddleware';
import { NextFunction, Request, Response, Router } from 'express';
import { IOC } from './../services/IOC';

export type RouteAction = (req: Request, res: Response) => void;
export type RouteActionWithUserId = (req: IUserIdRequest, res: Response) => void;
export type RouteMiddleware = (req: Request, res: Response, next: NextFunction) => void;

export interface IRoute {
    url: string;
    method: Method;
    action: RouteAction | RouteActionWithUserId;
    middlewares?: RouteMiddleware[];
}

export type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

const { logService } = IOC.instance;

export abstract class BaseController {

    protected abstract readonly routes: IRoute[];

    private router: Router;
    private routerUrl: string;

    constructor(routerUrl: string) {
        this.router = Router();
        this.routerUrl = routerUrl;
    }

    public getRouter() {
        return this.router;
    }

    protected setupRoutes = () => {
        if (!this.routes.length) return console.warn(`${this.getClassName()} - No routes for this router`);
        if (!this.isTestMode()) logService.log(this.routerUrl + ' endpoint available:');
        for (const route of this.routes) {
            const middlewares = route.middlewares && route.middlewares.length ? route.middlewares : [];
            (this.router as any)[route.method](this.getRouteUrl(route), ...middlewares, route.action);
            if (!this.isTestMode()) logService.log(route.method, '-', this.getRouteUrl(route));
        }
    }

    private getClassName(){
        return (this as any).constructor.name;
    }

    private getRouteUrl(route: IRoute){
        return `/${this.routerUrl}${route.url}`;
    }

    private isTestMode(){
        return process.env.NODE_ENV === 'test';
    }

}