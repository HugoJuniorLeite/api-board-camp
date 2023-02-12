import Joi from "joi";

export const newClientSchema =Joi.object({
name: Joi.string().required(),
phone: Joi.number().required(),
cpf: Joi.number().required(),
birthday: Joi.string().required(),
})