import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services';

class UserController {
    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                throw new Error('Bad Request');
            }
            const tokenResponse = await UserService.login(username, password);
            res.send(tokenResponse);
        } catch (error) {
            next(error);
        }
    };

    signup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                throw new Error('Bad Request');
            }
            const tokenResponse = await UserService.signup(username, password);
            res.send(tokenResponse);
        } catch (error) {
            next(error);
        }
    };

    getNewAccessToken = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { authorization } = req.headers;
            const accessToken = UserService.parseAccessToken(authorization);
            const { grantType, refreshToken } = req.body;
            if (!grantType || grantType !== 'refreshToken') {
                throw new Error('Please specify Grant type');
            }
            if (!refreshToken) {
                throw new Error('Refresh Token is missing');
            }
            const newTokenResponse = await UserService.getNewAccessToken(
                accessToken,
                refreshToken
            );
            res.send(newTokenResponse);
        } catch (err) {
            next(err);
        }
    };
}

export default new UserController();
