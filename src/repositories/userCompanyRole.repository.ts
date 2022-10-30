import { FindOptions, FindOrCreateOptions } from "sequelize";
import {
  transformUserCompanyRole,
  transformUserCompanyRoles,
} from "../dto/userCompanyRole.dto";
import UserCompanyRole from "../models/userCompanyRole.model";
import type {
  UserCompanyRoleAttributes,
  UserCompanyRoleType,
} from "../types/userCompanyRole.interface";

/**
 * create userCompanyRole
 * @param {CreateUserCompanyRoleType} userCompanyRole
 * @returns {Promise<UserCompanyRoleType>} Create userCompanyRole
 */
export const create = async (
  options: FindOrCreateOptions<UserCompanyRoleAttributes>
): Promise<UserCompanyRoleType> => {
  const [createUserCompanyRole] = await UserCompanyRole.findOrCreate(options);

  return transformUserCompanyRole(createUserCompanyRole);
};

/**
 * Get UserCompanyRole Information
 *
 * @param {FindOptions<CompanyAttributes>} options
 * @returns {Promise<CompanyType | null>} Find UserCompanyRole
 */
export const findOne = async (
  options: FindOptions<UserCompanyRoleAttributes>
): Promise<UserCompanyRoleType | null> => {
  const result = await UserCompanyRole.findOne(options);

  return result ? transformUserCompanyRole(result) : null;
};

/**
 * Get UserCompanyRoles Information
 *
 * @param {FindOptions<CompanyAttributes>} options
 * @returns {Promise<CompanyType[]>} Find UserCompanyRoles
 */
export const findAll = async (
  options: FindOptions<UserCompanyRoleAttributes>
): Promise<UserCompanyRoleType[]> => {
  const result = await UserCompanyRole.findAll(options);

  return transformUserCompanyRoles(result);
};

export default {
  create,
  findOne,
  findAll,
};
