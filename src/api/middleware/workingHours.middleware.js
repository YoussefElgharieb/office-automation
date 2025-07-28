import OutsideWorkingHoursError from "../../errors/OutsideWorkingHoursError.js";
import {getMinutesTillOpening} from "../../services/hours/hours.service.js";

export default (req,res, next) => {
    const minutesTillOpening = getMinutesTillOpening();
    if(minutesTillOpening !== 0) {
        throw new OutsideWorkingHoursError("Requests not allowed outside working hours.");
    }
    return next();
}