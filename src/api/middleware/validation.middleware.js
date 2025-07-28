import ValidationError from "../../errors/ValidationError.js";

export default (validator, target = 'body') => {
    return (req, res, next) => {
        const {error} = validator.validate(req[target], {abortEarly: false});
        if (error) {
            const messages = error.details.map(detail => detail.message);
            throw new ValidationError(messages);
        }

        next();
    }
}