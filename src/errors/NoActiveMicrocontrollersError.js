import MicrocontrollerError from "./MicrocontrollerError.js";

export default class NoActiveMicrocontrollers extends MicrocontrollerError {
    constructor(message) {
        super(message, 503);
    }
}