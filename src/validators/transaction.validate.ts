import Joi from "joi";

const createTransactionSchema: Joi.ObjectSchema = Joi.object().keys({
  to: Joi.string()
    .guid({
      version: ["uuidv4"],
    })
    .required(),
  amount: Joi.number().min(0).required(),
});

export default {
  createTransactionSchema,
};
