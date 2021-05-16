import { Router } from 'express';
import UserController from '../../controllers/UserController';

class UserRouter {
    private _router = Router();
    private _controller = UserController;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    /**
     * Connect routes to their matching controller endpoints.
     */
    private _configure() {
        this._router.post('/login', this._controller.login);
        this._router.post('/signup', this._controller.signup);
        this._router.post(
            '/get_access_token',
            this._controller.getNewAccessToken
        );
    }
}

export = new UserRouter().router;
