import {Router} from 'express';

import * as requestController from '../../controllers/requests.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import{ USER_API_KEY }from '../../config/app.keys.js';
import WorkingHoursMiddleware from "../middleware/workingHours.middleware.js";

const router = Router();

router.use(authMiddleware([USER_API_KEY]));
router.use(WorkingHoursMiddleware);

/**
 * @swagger
 * tags:
 *      name: Requests
 *      description: Place requests to the office automation system.
 */

/**
 * @swagger
 * /requests/elevator-activation:
 *  get:
 *      tags: [Requests]
 *      summary: Place an elevator activation request.
 *      description: Place a request to activate Cairo office's elevator.
 *      responses:
 *          200:
 *              description: Elevator activation request placed successfully.
 *          500:
 *              description: Internal server error.
 */
router.get('/elevator-activation', requestController.requestElevatorActivation);

export default router;