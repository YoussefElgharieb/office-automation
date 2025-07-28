import {Router} from 'express';

import elevatorActivationMicrocontrollersRoutes from "./microcontrollers/elevatorActivationMicrocontrollers.routes.js";

const router = Router();

router.use('/elevator-activation', elevatorActivationMicrocontrollersRoutes);

export default router;