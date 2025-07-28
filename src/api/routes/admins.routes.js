import {Router} from 'express';

import * as adminsController from '../../controllers/admins.controller.js';
import validationMiddleware from '../middleware/validation.middleware.js';
import authMiddleware from '../middleware/auth.middleware.js';
import { ADMIN_API_KEY } from '../../config/app.keys.js';
import adminsValidator from "../../services/admins/admins.validator.js";

const router = Router();

router.use(authMiddleware([ADMIN_API_KEY]));

/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: Manage office automation administrators.
 */

/**
 * @swagger
 * /admins:
 *  get:
 *      tags: [Admins]
 *      summary: Retrieve the list of admins.
 *      description: Returns an array of admins.
 *      responses:
 *          200:
 *              description: A list of admins.
 *              content:
 *                  application/json:
 *                      example: [{
 *                          id: "XXXXXXXXXXX",
 *                          name: "John Doe"
 *                      }]
 *          401:
 *              description: Unauthorized error.
 *          500:
 *              description: Internal server error.
 */
router.get('/', adminsController.getAdmins);

/**
 * @swagger
 * /admins:
 *  put:
 *      tags: [Admins]
 *      summary: Updates the current list of admins with the provided user IDs
 *      description: Updates the current list of admins with the provided user IDs.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  example:
 *                      ids: ["XXXXXXXXXXX"]
 *      responses:
 *          200:
 *              description: Admins list successfully updated.
 *              content:
 *                  application/json:
 *                      example: [{
 *                          id: "XXXXXXXXXXX",
 *                          name: "John Doe"
 *                      }]
 *          400:
 *              description: Invalid input data.
 *          401:
 *              description: Unauthorized error.
 *          500:
 *              description: Internal server error.
 */
router.put('/', validationMiddleware(adminsValidator), adminsController.updateAdmins);

export default router;
