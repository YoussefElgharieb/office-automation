import {Router} from 'express';

import adminRoutes from "./admins.routes.js";
import hoursRoutes from "./hours.routes.js";
import microcontrollersRoutes from "./microcontrollers.routes.js";
import requestsRoutes from "./requests.routes.js";
import usersRoutes from "./users.routes.js";
import errorHandlerMiddleware from "../middleware/errorHandler.middleware.js";

const router = Router();


router.use('/admins', adminRoutes);
router.use('/hours',hoursRoutes);
router.use('/microcontrollers', microcontrollersRoutes);
router.use('/requests', requestsRoutes);
router.use('/users', usersRoutes);

router.use(errorHandlerMiddleware);

export default router;