import Microcontroller from "./Microcontroller.js";
import logger from "../loaders/logger.js"

class MicrocontrollersManager {
    constructor(onActiveHandler, onInactiveHandler, pollHandler, count = 2) {
        this.onActiveHandler = onActiveHandler;
        this.onInactiveHandler = onInactiveHandler;
        this.pollHandler = pollHandler;

        this.microcontrollers = new Map();

        for (let id = 1; id <= count; id++) {
            const microcontroller = new Microcontroller(
                () => this.onActiveHandler(id),
                () => this.onInactiveHandler(id),
                false
            );
            this.microcontrollers.set(id.toString(), microcontroller);
        }
    }

    getMicrocontroller(id) {
        if (!this.microcontrollers.has(id)) {
            const microcontroller = new Microcontroller(
                () => this.onActiveHandler(id),
                () => this.onInactiveHandler(id),
            );
            this.microcontrollers.set(id, microcontroller);
        }
    }

    resetMicrocontrollerActivity(id) {
        if (!this.microcontrollers.has(id)) {
            this.getMicrocontroller(id);
        } else {
            const microcontroller = this.microcontrollers.get(id);
            microcontroller.resetActivity();
        }
    }

    getStatus() {
        logger.info(`Microcontrollers status is requested.`)
        const dto = [...this.microcontrollers].map(([key, value]) => ({
            id: key,
            isActive: value.isActive(),
            lastActiveAt: value.lastActiveAt ?? 'Never'
        }));

        logger.debug(`Responding to request with ${JSON.stringify(dto)}.`)
        return dto;
    }

    isAnyActive() {
        return this.microcontrollers.values().some(x => x.isActive());
    }

    async poll(id) {
        return this.pollHandler(id);
    }
}

export default MicrocontrollersManager;