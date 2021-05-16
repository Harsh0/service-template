import sha256 from 'sha256';
import * as jwt from 'jsonwebtoken';

import config from '../config';
import { User } from '../entities';

const JWT_SECRET = config.JWT_SECRET || '';

class UserService {
    async login(username: string, password: string) {
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('User does not exist');
        }
        if (user.password !== sha256(password)) {
            throw new Error('Wrong password');
        }
        const { accessToken, refreshToken } = await this.generateNewAuth(user);
        user.refreshToken = refreshToken;
        await user.save();
        return { accessToken, refreshToken };
    }

    async signup(username: string, password: string) {
        const user = await User.findOne({ username });
        if (user) {
            throw new Error('User already exist');
        }
        const newUser = new User();
        newUser.username = username;
        newUser.password = sha256(password);
        const { accessToken, refreshToken } = await this.generateNewAuth(
            newUser
        );
        newUser.refreshToken = refreshToken;
        await newUser.save();
        return { accessToken, refreshToken };
    }

    async getNewAccessToken(oldAccessToken: string, refreshToken: string) {
        const user = await User.findOne({
            refreshToken,
        });
        if (!user) {
            throw new Error('User is unauthenticated');
        }
        await this.verifyOldAccessToken(user, oldAccessToken);
        const accessToken = await this.signNewAccessToken(user);
        return { refreshToken, accessToken };
    }

    parseAccessToken(authorization: string | undefined) {
        if (!authorization) {
            throw new Error('Access Token is not valid');
        }
        const [tokenType, token] = authorization.split(' ');
        if (!tokenType || tokenType != 'Bearer' || !token) {
            throw new Error('Access Token is not valid');
        }
        return token;
    }

    async generateNewAuth(user: User) {
        const accessToken = await this.signNewAccessToken(user);
        const refreshToken = sha256(
            Date.now() +
                '_' +
                Math.floor(
                    Math.random() * (9999999999 - 1000000000) + 1000000000
                )
        );
        return { accessToken, refreshToken };
    }

    async verifyOldAccessToken(user: User, accessToken: string) {
        try {
            const decodedAccessToken = <{ [key: string]: any }>(
                await jwt.verify(accessToken, JWT_SECRET)
            );
            if (decodedAccessToken.username != user.username) {
                throw new Error('Access Token is not valid');
            }
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                // check if user is matching with refresh token
                const decodedAccessToken = <{ [key: string]: any }>(
                    await jwt.decode(accessToken)
                );
                if (decodedAccessToken.username != user.username) {
                    throw new Error('Access Token is not valid');
                }
            } else if (err instanceof jwt.JsonWebTokenError) {
                throw new Error('Access Token is not valid');
            } else {
                throw err;
            }
        }
    }

    async signNewAccessToken(user: User) {
        return await jwt.sign(
            {
                username: user.username,
            },
            JWT_SECRET,
            {
                expiresIn: config.ACCESS_TOKEN_VALIDITY_SECONDS,
            }
        );
    }
}

export default new UserService();
