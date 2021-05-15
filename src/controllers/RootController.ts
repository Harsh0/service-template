import { NextFunction, Request, Response } from 'express';
import { MainService } from '../services';

class RootController {
    defaultMethod = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const welcomeMessage = MainService.getWelcomeMessage();
            res.send(welcomeMessage);
        } catch (err) {
            next(err);
        }
    };

    handle404 = async (req: Request, res: Response, next: NextFunction) => {
        if (req.path != '/') {
            next(new Error('Method Not Found'));
        }
        next();
    };
}

export default new RootController();
