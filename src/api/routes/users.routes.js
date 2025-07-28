import {Router} from 'express';

import * as usersController from "../../controllers/users.controller.js";
import authMiddleware from '../middleware/auth.middleware.js';
import { ADMIN_API_KEY } from "../../config/app.keys.js";

const router = Router();

router.use(authMiddleware([ADMIN_API_KEY]))

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Used by automation system's admin to manage Slack users.
 */

/**
 * @swagger
 * /users:
 *  get:
 *      tags: [Users]
 *      summary: Retrieve the list of Slack users.
 *      description: Returns an array of active Slack users.
 *      responses:
 *          200:
 *              description: A list of users.
 *              content:
 *                  application/json:
 *                      example: [{
 *                          id: "XXXXXXXXXXX",
 *                          name: "Youssef Elgharieb"
 *                      }]
 *          400:
 *              description: Slack Web Client errors.
 *          401:
 *              description: Unauthorized error.
 *          500:
 *              description: Internal server error.
 */
router.get('/', usersController.getUsers);

export default router;