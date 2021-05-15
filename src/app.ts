import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import config from './config';
class Server {
    public app = express();
}

// initialize server app
const server = new Server();
// cors
server.app.use(
    cors({
        // Allow all origins
        origin: (origin: any, callback: any) => {
            callback(null, true);
        },
        credentials: true,
    })
);

// Health check endpoint
server.app.get('/', (req, res) => res.send('Welcome to Main Service'));
server.app.get('/health', (req, res) => res.send('Healthy'));
server.app.get('/host', (req, res) => res.send('HOSTNAME: ' + config.HOSTNAME));
server.app.get('/commit', (req, res) =>
    res.redirect(
        `${config.GITHUB_HOMEPAGE_URL}/commit/${config.GITHUB_COMMIT_SHA}`
    )
);

// Add cookie parser
server.app.use(cookieParser());

// Add body parser
server.app.use(express.json());
server.app.use(express.text({ type: 'text/*' }));
server.app.use(express.urlencoded({ extended: false }));

// make server app handle any error
server.app.use(
    (err: Error, req: Request, res: Response, next: NextFunction) => {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
);

((port = config.APP_PORT) => {
    server.app.listen(port, () =>
        console.timeLog(
            '✌️  Server Started in',
            `> Listening on port ${port} ⚡`
        )
    );
})();
