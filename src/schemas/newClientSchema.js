import Joi from "joi";

export const newClientSchema =Joi.object({
name: Joi.string().required(),
phone: Joi.number().min(10).max(11).required,
cpf: Joi.number().min(11).max(11).required(),
birthday: Joi.number().required(),
})

