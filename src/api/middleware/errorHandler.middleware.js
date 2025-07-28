import AppError from '../../errors/AppError.js';
import logger from '../../loaders/logger.js';
import MicrocontrollerError from "../../errors/MicrocontrollerError.js";

export default (err, req, res, _next) => {
    const isAppError = err instanceof AppError;
    const isMicrocontrollerError = err instanceof MicrocontrollerError;
    const status = isAppError || isMicrocontrollerError ? err.statusCode : 500;

    logger[isAppError ? 'warn' : 'error'](`${isAppError || isMicrocontrollerError ? 'AppError' : 'Unhandled Error'}: ${err.message}`, {
        statusCode: status,
        path: req.originalUrl,
        method: req.method,
        ...(isAppError || isMicrocontrollerError ? {} : { stack: err.stack })
    });

    res.status(status).json({
        message: err.message || 'Internal Server Error'
    });
}
