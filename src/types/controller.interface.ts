import { Request, Response } from 'express';

export type RequestBodyType<T> = Request & {
  body: T;
};

export type ControllerBaseFunctionType<T> = (
  request: RequestBodyType<T>,
  response: Response
) => void;
