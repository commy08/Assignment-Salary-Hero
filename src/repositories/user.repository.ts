import {
  DestroyOptions,
  FindAndCountOptions,
  FindOptions,
  RestoreOptions,
} from "sequelize";
import { transformUser, transformUsersFindAndCountAll } from "../dto/user.dto";
import User from "../models/user.model";
import type {
  CreateUserType,
  UserAttributes,
  UsersFindAndCountAllType,
  UserType,
} from "../types/user.interface";

/**
 * create user
 * @param {CreateUserType} user
 * @returns {UserType} Create user
 */
export const upsert = async (user: CreateUserType): Promise<UserType> => {
  const [result] = await User.upsert(user);

  return transformUser(result);
};

/**
 * Get user's information
 * @param {FindOptions<UserAttributes>} options
 * @returns {UserType | null} user's information
 */
export const findOne = async (
  options: FindOptions<UserAttributes>
): Promise<UserType | null> => {
  const user = await User.findOne(options);

  return user ? transformUser(user) : null;
};

/**
 * Get Users Information
 *
 * @param {FindAndCountOptions<UserAttributes>} options
 * @returns {CompaniesFindAndCountAllType} Find and count all companies
 */
export const findAndCountAll = async (
  options: FindAndCountOptions<UserAttributes>
): Promise<UsersFindAndCountAllType> => {
  const companies = await User.findAndCountAll(options);

  return transformUsersFindAndCountAll(companies);
};

/**
 * Destroy user by Id
 *
 * @param {DestroyOptions<UserAttributes>} options
 * @returns {Promise<number>} destroy user by Id
 */
export const destroy = async (
  options: DestroyOptions<UserAttributes>
): Promise<number> => {
  const result = User.destroy(options);

  return result;
};

/**
 * Destroy user by Id
 *
 * @param {RestoreOptions<UserAttributes>} options
 * @returns {Promise<void>} destroy user by Id
 */
export const restore = async (
  options: RestoreOptions<UserAttributes>
): Promise<void> => {
  const result = User.restore(options);

  return result;
};

export default {
  upsert,
  findOne,
  findAndCountAll,
  destroy,
  restore,
};
