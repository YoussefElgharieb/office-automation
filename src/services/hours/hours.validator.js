import Joi from 'joi';

const daySchema = Joi.object({
    isOpen: Joi.boolean()
        .required(),

    opening: Joi.number()
        .integer()
        .min(0)
        .max(23)
        .when('isOpen', { is: true, then: Joi.required() }),

    closing: Joi.number()
        .integer()
        .min(0)
        .max(23)
        .greater(Joi.ref('opening'))
        .when('isOpen', { is: true, then: Joi.required() }),
});

const hoursSchema = Joi.object({
    sunday: daySchema.required(),
    monday: daySchema.required(),
    tuesday: daySchema.required(),
    wednesday: daySchema.required(),
    thursday: daySchema.required(),
    friday: daySchema.required(),
    saturday: daySchema.required(),
});

export default hoursSchema;
