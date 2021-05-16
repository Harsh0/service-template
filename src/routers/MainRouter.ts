import { Router } from 'express';

import ApiDocsRouter from './api-docs/ApiDocsRouter';
import UserRouter from './user/UserRouter';

import RootController from '../controllers/RootController';

class MasterRouter {
    private _router = Router();
    private _controller = RootController;
    private _apiDocRouter = ApiDocsRouter;
    private _userRouter = UserRouter;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    /**
     * Connect routes to their matching routers.
     */
    private _configure() {
        this._router.use('/api-docs', this._apiDocRouter);
        this._router.use('/user', this._userRouter);
        /**
         * Handle 404 and default Endpoint
         */
        this._router.use(
            this._controller.handle404,
            this._controller.defaultMethod
        );
    }
}

export = new MasterRouter().router;
