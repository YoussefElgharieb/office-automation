import {Router} from 'express';

import * as elevatorActivationMicrocontrollersController from '../../../controllers/microcontrollers/elevatorActivationMicrocontrollers.controller.js';
import authMiddleware from "../../middleware/auth.middleware.js";
import {ELEVATOR_ACTIVATION_MICROCONTROLLER_API_KEY, ADMIN_API_KEY} from "../../../config/app.keys.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Elevator Activation Microcontrollers
 *   description: Used by elevator activation microcontrollers to fulfilling requests and by automation system's admin to manage them.
 */

/**
 *
 * @swagger
 * /microcontrollers/elevator-activation/status:
 *  get:
 *      tags: [Elevator Activation Microcontrollers]
 *      summary: Retrieve the status of elevator activation microcontrollers.
 *      description: Returns a list of statuses for elevator activation microcontrollers.
 *      responses:
 *          200:
 *              description: A list of statuses for elevator activation microcontrollers.
 *              content:
 *                  application/json:
 *                      example: [{
 *                         id: "1",
 *                         isActive: false,
 *                         lastActiveAt: "never"
 *                      }]
 *          401:
 *              description: Unauthorized error.
 *          500:
 *              description: Internal server error.
 */
router.get('/status', authMiddleware([ADMIN_API_KEY]), elevatorActivationMicrocontrollersController.getStatus);

/**
 *
 * @swagger
 * /microcontrollers/elevator-activation/{id}:
 *  get:
 *      tags: [Elevator Activation Microcontrollers]
 *      summary: Poll a specific microcontroller for pending requests and sleep status.
 *      description: Returns an object indicating whether there are pending activation requests and the time in minutes the microcontroller is scheduled to sleep.
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description: The ID of the elevator activation microcontroller.
 *      responses:
 *          200:
 *              description: An object containing data for the microcontroller.
 *              content:
 *                  application/json:
 *                      example: {
 *                          isActivationRequested: false,
 *                          sleepUntil: "180"
 *                      }
 *          401:
 *              description: Unauthorized error.
 *          500:
 *              description: Internal server error.
 */
router.get('/:id', authMiddleware([ELEVATOR_ACTIVATION_MICROCONTROLLER_API_KEY]), elevatorActivationMicrocontrollersController.poll);

export default router;