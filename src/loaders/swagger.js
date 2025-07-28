import swaggerJSDoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

import {ENV} from '../config/app.config.js';
import * as environments from "../constants/environments.constants.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePaths = [
    resolve(__dirname, '../api/routes/*.js'),
    resolve(__dirname, '../api/routes/microcontrollers/*.js')
    ];


const isLocal = ENV === environments.local;

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for office automation',
        version: '1.0.0',
        description: 'This is a RESTful API built with Express.js, ' +
            'designed to facilitate communication between our Slack workspace ' +
            'and microcontrollers distributed throughout the office. ' +
            'It includes controllers for managing Slack users (users), ' +
            'system administrators (admins, a subset of Slack users with elevated permissions), ' +
            'request handling for the office automation system, ' +
            'microcontroller communication for fulfilling those requests, ' +
            'and microcontroller communication for fulfilling those requests.'
    },
    servers:[
        {
            url:isLocal ? 'http://localhost:3000/api' : 'https://office-automation.azurewebsites.net/api',
            description: isLocal ? 'Local server' : 'Production server',
        }
    ],
    components: {
        securitySchemes: {
            apiKeyAuth: {
                type: 'apiKey',
                in: 'header',
                name: 'authorization',
                description: 'API Key required to access this endpoint',
            },
        },
    },
    security: [
        {
            apiKeyAuth: [],
        },
    ]
};

const options = {
    swaggerDefinition,
    apis: filePaths,
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;