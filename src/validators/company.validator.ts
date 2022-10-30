import Joi from "joi";

const createCompanySchema: Joi.ObjectSchema = Joi.object().keys({
  name: Joi.string().required(),
});

const updateCompanySchema: Joi.ObjectSchema = Joi.object().keys({
  name: Joi.string().required(),
});

export default {
  createCompanySchema,
  updateCompanySchema,
};
