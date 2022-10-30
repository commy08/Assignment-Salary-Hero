import Joi from 'joi';
import { Request, NextFunction, Response } from 'express';

type JoiOptionsDataType = 'body' | 'params';
type JoiOptionsType = {
  [key in JoiOptionsDataType]: JoiOptionsDataType;
};
export const JOI_OPTIONS: JoiOptionsType = {
  body: 'body',
  params: 'params',
};

export type ValidationType = {
  options: JoiOptionsDataType;
  schema: Joi.ObjectSchema;
};

export const validateSchemaMiddleware = (validation: ValidationType) => {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      Joi.attempt(request[validation.options], validation.schema);
    } catch (error) {
      if (error) {
        response.status(400).json({
          message: error.details[0].message,
          context: error.details[0].context,
          path: error.details[0].path,
        });
      }
      response.status(400).send('Invalid request params');
    }
    return next();
  };
};
