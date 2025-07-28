import * as elevatorActivationService from './elevatorActivation.service.js'

import elevatorActivationMicrocontrollersService
    from "./microcontrollers/elevatorActivationMicrocontrollers.service.js";
import NoActiveMicrocontrollers from "../errors/NoActiveMicrocontrollersError.js";
import logger from "../loaders/logger.js"

export const requestElevatorActivation = () => {
    logger.info("Requesting elevator activation.");

    logger.debug("Checking if there are any active elevator activation microcontrollers.")
    if (!elevatorActivationMicrocontrollersService.isAnyActive()) {
        throw new NoActiveMicrocontrollers("No active microcontrollers available. Please contact an administrator.");
    }

    elevatorActivationService.addRequestFromApi();
}