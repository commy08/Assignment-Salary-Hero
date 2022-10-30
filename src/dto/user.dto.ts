import { FindAndCountAllResponseType } from "../types/base.interface";
import type {
  CreateUserInputType,
  CreateUserType,
  TransformCreateUserBodyType,
  UserAttributes,
  UserType,
  CreateUserBodyType,
  UsersFindAndCountAllType,
} from "../types/user.interface";

export const transformUser = (user: UserAttributes): UserType => {
  return {
    id: user.id,
    national_id: user.national_id,
    firstName: user.first_name,
    lastName: user.last_name,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  };
};

export const transformCreateUser = (
  user: CreateUserInputType
): CreateUserType => {
  return {
    national_id: user.nationalId,
    first_name: user.firstName,
    last_name: user.lastName,
  };
};

export const transformCreateUserBody = (
  user: CreateUserBodyType
): TransformCreateUserBodyType => {
  return {
    national_id: user.nationalId,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};

export const transformUsers = (users: UserAttributes[]): UserType[] => {
  return users.map((user) => transformUser(user));
};

export const transformUsersFindAndCountAll = ({
  rows,
  count,
}: FindAndCountAllResponseType<UserAttributes>): UsersFindAndCountAllType => {
  const users = transformUsers(rows);

  return {
    users,
    total: count,
  };
};
