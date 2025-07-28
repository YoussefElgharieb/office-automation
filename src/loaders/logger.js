import winston from 'winston';
import DatadogWinston from 'datadog-winston';

import {ENV} from "../config/app.config.js";
import {DATADOG_API_KEY} from "../config/datadog.keys.js";
import * as environments from "../constants/environments.constants.js";

const isLocal = ENV === environments.local;

const logger = winston.createLogger({
    level: "debug"
});

if (isLocal) {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }))
}
else {
    logger.add(
        new DatadogWinston({
            apiKey: DATADOG_API_KEY,
            hostname: isLocal ? 'azure-office-automation' :'local-office-automation',
            service: 'office-automation-service',
            intakeRegion: 'eu',
        })
    )
}

export default logger;

