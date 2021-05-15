import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import config from '../../config';

class ApiDocsRouter {
    private _router = Router();

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
        const options = {
            swaggerDefinition: {
                openapi: '3.0.0',
                servers: [
                    {
                        url: '/',
                        description: 'Try it out Now',
                    },
                ],
                info: {
                    title: 'Main Service Backend API',
                    version: '1.0.0', // Version of the app
                    description: `API modelling for different use case. Environment=${config.NODE_ENV}`,
                    contact: { email: 'admin0@example.com' },
                },
                components: {
                    securitySchemes: {
                        bearerAuth: {
                            type: 'http',
                            scheme: 'bearer',
                            bearerFormat: 'JWT',
                        },
                        basicAuth: {
                            type: 'http',
                            scheme: 'basic',
                        },
                    },
                },
            },
            // path to the API docs
            apis: ['./public/swagger/**/*.yaml'],
        };
        // initialize swagger-jsdoc
        const swaggerSpec = swaggerJsdoc(options);
        this._router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }
}

export = new ApiDocsRouter().router;
