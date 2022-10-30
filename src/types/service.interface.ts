import { ClassBaseType } from "./base.interface";

export type ServiceBaseType = ClassBaseType;

export type ResponseErrorType = {
  status: number;
  message: string;
};
