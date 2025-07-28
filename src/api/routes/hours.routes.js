import {Router} from 'express';

import * as hoursController from '../../controllers/hours.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import validationMiddleware from '../middleware/validation.middleware.js';
import {ADMIN_API_KEY} from '../../config/app.keys.js';
import hoursValidator from "../../services/hours/hours.validator.js";

const router = Router();

router.use(authMiddleware([ADMIN_API_KEY]))
/**
 * @swagger
 * tags:
 *   name: Hours
 *   description: Manage Cairo office's working hours
 */

/**
 * @swagger
 * /hours:
 *  get:
 *      tags: [Hours]
 *      summary: Retrieve Cairo office's working hours
 *      description:
 *          Returns an object representing the working hours of the Cairo office for each day of the week.
 *          Each key is a day, and the value indicates whether the office is open (`isOpen`) and, if so, the opening and closing times in 24-hour format.
 *          Times represent when the office automation system is expected to be active.
 *      responses:
 *          200:
 *              description: A JSON object containing working hours for each day of the week.
 *              content:
 *                  application/json:
 *                      example:
 *                          sunday:
 *                              isOpen: false
 *                          monday:
 *                              isOpen: true
 *                              opening: 6
 *                              closing: 23
 *                          tuesday:
 *                              isOpen: true
 *                              opening: 6
 *                              closing: 23
 *                          wednesday:
 *                              isOpen: true
 *                              opening: 6
 *                              closing: 23
 *                          thursday:
 *                              isOpen: true
 *                              opening: 6
 *                              closing: 23
 *                          friday:
 *                              isOpen: true
 *                              opening: 6
 *                              closing: 19
 *                          saturday:
 *                              isOpen: false
 *          401:
 *              description: Unauthorized error.
 *          500:
 *              description: Internal server error.
 */
router.get('/', hoursController.getHours);

/**
 * @swagger
 * /hours:
 *  put:
 *      tags: [Hours]
 *      summary: Update Cairo office's working hours
 *      description: |
 *          Updates the working hours of the Cairo office for each day of the week.
 *          Each key should represent a day of the week.
 *          If `isOpen` is true, both `opening` and `closing` times (in 24-hour format) must be provided.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  example:
 *                      sunday:
 *                          isOpen: false
 *                      monday:
 *                          isOpen: true
 *                          opening: 6
 *                          closing: 23
 *                      tuesday:
 *                          isOpen: true
 *                          opening: 6
 *                          closing: 23
 *                      wednesday:
 *                          isOpen: true
 *                          opening: 6
 *                          closing: 23
 *                      thursday:
 *                          isOpen: true
 *                          opening: 6
 *                          closing: 23
 *                      friday:
 *                          isOpen: true
 *                          opening: 6
 *                          closing: 19
 *                      saturday:
 *                          isOpen: false
 *      responses:
 *          200:
 *              description: Working hours successfully updated.
 *              content:
 *                  application/json:
 *                      example:
 *                          sunday:
 *                              isOpen: false
 *                          monday:
 *                              isOpen: true
 *                              opening: 6
 *                              closing: 23
 *                          tuesday:
 *                              isOpen: true
 *                              opening: 6
 *                              closing: 23
 *                          wednesday:
 *                              isOpen: true
 *                              opening: 6
 *                              closing: 23
 *                          thursday:
 *                              isOpen: true
 *                              opening: 6
 *                              closing: 23
 *                          friday:
 *                              isOpen: true
 *                              opening: 6
 *                              closing: 19
 *                          saturday:
 *                              isOpen: false
 *          400:
 *              description: Invalid input data.
 *          401:
 *              description: Unauthorized error.
 *          500:
 *              description: Internal server error.
 */
router.put('/', validationMiddleware(hoursValidator), hoursController.updateHours);

/**
 * @swagger
 * /hours/minutes-till-opening:
 *  get:
 *      tags: [Hours]
 *      summary: Get minutes until the Cairo office opens
 *      description: Returns the number of minutes remaining until the Cairo office next opens. If the office is currently open, it returns 0.
 *      responses:
 *          200:
 *              description: Number of minutes until opening
 *              content:
 *                  application/json:
 *                      example: 2001
 *          401:
 *              description: Unauthorized error.
 *          500:
 *              description: Internal server error.
 */
router.get('/minutes-till-opening', hoursController.getMinutesTillOpening);

export default router;