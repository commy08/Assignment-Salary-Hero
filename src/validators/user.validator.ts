import Joi from "joi";

const createUserSchema: Joi.ObjectSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  nationalId: Joi.string().required(),
  companyId: Joi.string()
    .guid({
      version: ["uuidv4"],
    })
    .required(),
  salary: Joi.number().min(0).required(),
});

const updateUserSchema: Joi.ObjectSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  nationalId: Joi.string().required(),
});

export default {
  createUserSchema,
  updateUserSchema,
};
