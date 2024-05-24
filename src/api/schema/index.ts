import Joi from "joi";


export const userRegisterSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().optional().allow(null),
    phone_number: Joi.string().length(10).pattern(/^\d+$/).required().messages({
        'string.length': 'Phone number must be exactly 10 digits.',
        'string.pattern.base': 'Phone number must contain only digits.',
        'any.required': 'Phone number is required.'
    }),
    password: Joi.string().min(8).required(),
})

export const loginSchema = Joi.object().keys({
    phone_number: Joi.string().min(8).required(),
    password: Joi.string().min(8).required(),
})