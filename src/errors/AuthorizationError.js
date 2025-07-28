import AppError from "./AppError.js";

export default class AuthorizationError extends AppError {
    constructor(message) {
        super(message, 401);
    }
}