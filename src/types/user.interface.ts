import { Optional } from "sequelize";

export type CreateUserType = {
  national_id: string;
  first_name?: string;
  last_name?: string;
};

export type UserType = {
  id: string;
  national_id: string;
  firstName: string | null;
  lastName: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserAttributes = {
  id: string;
  national_id: string;
  first_name: string;
  last_name: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export type UserInput = Optional<
  UserAttributes,
  "id" | "first_name" | "last_name"
>;
export type UserOutput = Required<UserAttributes>;

export type CreateUserInputType = {
  nationalId: string;
  firstName: string;
  lastName: string;
};

export type TransformCreateUserBodyType = {
  national_id: string;
  firstName: string;
  lastName: string;
};

export type CreateUserBodyType = {
  nationalId: string;
  firstName: string;
  lastName: string;
};

export type CreateUserForCompanyBodyType = {
  nationalId: string;
  firstName: string;
  lastName: string;
  companyId: string;
  salary: string;
};

export type FindAndCountUsersInputType = {
  limit: number;
  offset: number;
};

export type UsersFindAndCountAllType = {
  users: UserType[];
  total: number;
};

export type GetUserByIdsParamsType = {
  ids: string[];
  limit: number;
  offset: number;
};

export type UpdateUserBodyType = CreateUserInputType;
