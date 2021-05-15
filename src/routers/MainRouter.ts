import { Router } from 'express';

import RootController from '../controllers/RootController';

class MasterRouter {
    private _router = Router();
    private _controller = RootController;

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
