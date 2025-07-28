import AppError from "./AppError.js";

export default class OutsideWorkingHoursError extends AppError {
    constructor(message) {
        super(message, 403);
    }
}