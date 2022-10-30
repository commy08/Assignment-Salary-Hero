import { err, ok, Result } from "neverthrow";
import { FindOptions, FindOrCreateOptions } from "sequelize";
import { RoleRepository, UserCompanyRoleRepository } from "../repositories";
import { RoleAttributes } from "../types/role.interface";
import type { ResponseErrorType } from "../types/service.interface";

import type {
  CheckUserRoleType,
  CreateUserCompanyRoleInputType,
  UserCompanyRoleAttributes,
  UserCompanyRoleType,
} from "../types/userCompanyRole.interface";
import { v4 as uuidv4 } from "uuid";

/**
 * Create UserCompanyRole
 *
 * @param {CreateUserCompanyRoleInputType} userCompanyRole
 * @returns {Promise<Result<UserCompanyRoleType, ResponseErrorType>>} create user
 */
export const createUserCompanyRole = async ({
  companyId,
  roleId,
  userId,
}: CreateUserCompanyRoleInputType): Promise<
  Result<UserCompanyRoleType, ResponseErrorType>
> => {
  try {
    const userCompanyRole: FindOrCreateOptions<UserCompanyRoleAttributes> = {
      where: {
        user_id: userId,
        company_id: companyId,
        role_id: roleId,
      },
      defaults: {
        id: uuidv4(),
        user_id: userId,
        company_id: companyId,
        role_id: roleId,
      },
    };

    const result = await UserCompanyRoleRepository.create(userCompanyRole);
    return ok(result);
  } catch (error) {
    return err({
      status: 500,
      message: error.message,
    });
  }
};

/**
 * Get userCompanyRole by id
 *
 * @param {string} id
 * @returns { Promise<Result<UserCompanyRoleType, ResponseErrorType>>} UserCompanyRole's information
 */
export const getUserCompanyRoleById = async (
  id: string
): Promise<Result<UserCompanyRoleType, ResponseErrorType>> => {
  try {
    const option: FindOptions<UserCompanyRoleAttributes> = {
      where: {
        id,
      },
    };

    const result = await UserCompanyRoleRepository.findOne(option);

    if (!result) {
      return err({
        status: 404,
        message: `User company role id : ${id} not found`,
      });
    }

    return ok(result);
  } catch (error) {
    return err({
      status: 500,
      message: error.message,
    });
  }
};

/**
 * Check user role
 *
 * @param {CheckUserRoleType} options
 * @returns { Promise<Result<boolean, ResponseErrorType>>} boolean
 */
export const checkUserRole = async ({
  id,
  role,
}: CheckUserRoleType): Promise<Result<boolean, ResponseErrorType>> => {
  try {
    if (!id) {
      return err({
        status: 401,
        message: `Unauthorized`,
      });
    }

    const userCompanyRoleOptions: FindOptions<UserCompanyRoleAttributes> = {
      where: { id },
    };

    const userCompanyRole = await UserCompanyRoleRepository.findOne(
      userCompanyRoleOptions
    );

    if (!userCompanyRole) {
      return err({
        status: 404,
        message: `User company role id : ${id} not found`,
      });
    }

    const { roleId } = userCompanyRole;

    const roleOptions: FindOptions<RoleAttributes> = {
      where: { id: roleId },
    };

    const UserRole = await RoleRepository.findOne(roleOptions);

    if (!UserRole) {
      return err({
        status: 404,
        message: `Role id: ${roleId} not found`,
      });
    }

    const isAuth = UserRole.role === role;

    if (!isAuth) {
      return err({
        status: 403,
        message: `You're not allow`,
      });
    }

    return ok(isAuth);
  } catch (error) {
    return err({
      status: 500,
      message: error.message,
    });
  }
};

/**
 * Get users company by id
 *
 * @param {string} id
 * @returns { Promise<Result<UserCompanyRoleType[], ResponseErrorType>>} UserCompanyRole's information
 */
export const getUserCompanyRoleByCompanyId = async (
  id: string
): Promise<Result<UserCompanyRoleType[], ResponseErrorType>> => {
  try {
    const options: FindOptions<UserCompanyRoleAttributes> = {
      where: { company_id: id },
    };

    const result = await UserCompanyRoleRepository.findAll(options);

    return ok(result);
  } catch (error) {
    return err({
      status: 500,
      message: error.message,
    });
  }
};

export default {
  createUserCompanyRole,
  getUserCompanyRoleById,
  checkUserRole,
  getUserCompanyRoleByCompanyId,
};
