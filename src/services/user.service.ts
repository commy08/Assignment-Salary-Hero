import { err, ok, Result } from "neverthrow";
import {
  DestroyOptions,
  FindAndCountOptions,
  FindOptions,
  Op,
  RestoreOptions,
} from "sequelize";
import { transformCreateUser } from "../dto/user.dto";
import { UserRepository } from "../repositories";
import type { ResponseErrorType } from "../types/service.interface";
import type {
  CreateUserInputType,
  FindAndCountUsersInputType,
  GetUserByIdsParamsType,
  UserAttributes,
  UsersFindAndCountAllType,
  UserType,
} from "../types/user.interface";

/**
 * Create or update user
 *
 * @param {CreateUserInputType} user
 * @returns {UserType} create or update user
 */
export const upsertUser = async (
  user: CreateUserInputType
): Promise<Result<UserType, ResponseErrorType>> => {
  try {
    const userTransform = transformCreateUser(user);

    const result = await UserRepository.upsert(userTransform);

    return ok(result);
  } catch (error) {
    return err({
      status: 500,
      message: error.message,
    });
  }
};

/**
 * Get all users information
 *
 * @param {FindAndCountUsersInputType} options
 * @param {string} options.limit
 * @param {string} options.offset
 * @returns {Promise<Result<UsersFindAndCountAllType, ResponseErrorType>>} Get all users information
 */
export const getUsersAndTotal = async ({
  limit,
  offset,
}: FindAndCountUsersInputType): Promise<
  Result<UsersFindAndCountAllType, ResponseErrorType>
> => {
  try {
    const options: FindAndCountOptions<UserAttributes> = {
      limit,
      offset,
    };

    const result = await UserRepository.findAndCountAll(options);

    return ok(result);
  } catch (error) {
    return err({
      status: 500,
      message: error.message,
    });
  }
};

/**
 * Get user information by NationalId
 *
 * @param {string[]} ids
 * @returns {Promise<Result<UserType, ResponseErrorType>>} Get user information
 */
export const getUsersByIds = async ({
  ids,
  limit,
  offset,
}: GetUserByIdsParamsType): Promise<
  Result<UsersFindAndCountAllType, ResponseErrorType>
> => {
  try {
    const options: FindOptions<UserAttributes> = {
      where: { id: { [Op.in]: ids } },
      limit,
      offset,
    };

    const result = await UserRepository.findAndCountAll(options);

    return ok(result);
  } catch (error) {
    return err({
      status: 500,
      message: error.message,
    });
  }
};

/**
 * Delete user by Id
 *
 * @param {string} id
 * @returns {Promise<Result<number, ResponseErrorType>>} Delete user
 */
export const deleteUserById = async (
  id: string
): Promise<Result<number, ResponseErrorType>> => {
  try {
    const options: DestroyOptions<UserAttributes> = {
      where: { id },
    };

    const result = await UserRepository.destroy(options);

    return ok(result);
  } catch (error) {
    return err({
      status: 500,
      message: error.message,
    });
  }
};

/**
 * Restore user by Id
 *
 * @param {string} id
 * @returns {Promise<Result<void, ResponseErrorType>>} restore user
 */
export const restoreUserById = async (
  id: string
): Promise<Result<void, ResponseErrorType>> => {
  try {
    const options: RestoreOptions<UserAttributes> = {
      where: { id },
    };

    const result = await UserRepository.restore(options);

    return ok(result);
  } catch (error) {
    return err({
      status: 500,
      message: error.message,
    });
  }
};

export default {
  upsertUser,
  getUsersAndTotal,
  getUsersByIds,
  deleteUserById,
  restoreUserById,
};
