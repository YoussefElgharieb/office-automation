import AuthorizationError from "../../errors/AuthorizationError.js";

export default (apiKeys) => {
    return (req, res, next) => {
        if (!apiKeys.includes(req.headers['authorization'])) {
            throw new AuthorizationError("You are not authorized to access this endpoint!.");
        }
        return next();
    }
}