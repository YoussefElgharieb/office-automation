import './dotenv.config.js';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import open from 'open';

import * as config from '../config/app.config.js'
import apiRoutes from '../api/routes/api.routes.js';
import logger from './logger.js';
import socketModeClient from "../clients/socketMode.client.js";
import swaggerSpec from "./swagger.js";
import {local} from "../constants/environments.constants.js";

(async () => {
    await socketModeClient.start();
})();

const app = express();

app.use(express.json());
app.use('/api', apiRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(config.PORT, () => {
    logger.info(`Listening on port ${config.PORT}`);
});


const isLocal = process.env.NODE_ENV === local;

if (isLocal) {
    open("http://localhost:" + config.PORT + "/api");
}
