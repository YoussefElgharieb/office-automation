import Joi from 'joi';

const adminsSchema = Joi.object({
    ids: Joi.array()
        .items(Joi.string())
        .unique()
        .empty(),
});

export default adminsSchema;