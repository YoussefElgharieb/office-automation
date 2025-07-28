import MicrocontrollersManager from "../../models/MicrocontrollersManager.js";
import logger from "../../loaders/logger.js"
import * as elevatorActivationRequestsService from "../elevatorActivation.service.js";
import * as hoursService from "../hours/hours.service.js";

const onActiveHandler = (id) => {
    logger.info(`Elevator activation microcontroller ${id} is active`);
}

const onInactiveHandler = (id) => {
    logger.info(`Elevator activation microcontroller ${id} is inactive`);
}

const manager =  new MicrocontrollersManager(onActiveHandler, onInactiveHandler,
    async (id) => {
        const timestamp = new Date();
        logger.info(`Poll request received from microcontroller #${id} on ${timestamp.toLocaleString("en-US", {timeZone: "Africa/Cairo"})}.`, { id, timestamp });

        logger.debug(`Resetting microcontroller #${id}.`);
        manager.resetMicrocontrollerActivity(id);

        const isActivationRequested = elevatorActivationRequestsService.isActivationRequested();
        if (isActivationRequested) {
            await elevatorActivationRequestsService.clearRequests();
        }

        const minutesTillOpening = hoursService.getMinutesTillOpening();

        const dto = {
            isActivationRequested,
            sleepFor: Math.min(3 * 60, minutesTillOpening)
        };

        logger.debug(`Responding to poll request from #${id} with ${dto}`, { id, timestamp });
        return dto;
    });

export default manager;