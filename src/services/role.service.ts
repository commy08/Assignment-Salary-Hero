import { err, ok, Result } from "neverthrow";
import { FindOptions } from "sequelize";
import { RoleRepository } from "../repositories";
import type { RoleAttributes, RoleType } from "../types/role.interface";
import type { ResponseErrorType } from "../types/service.interface";

/**
 * Get role by name
 *
 * @param {string} role
 * @returns {Promise<Result<RoleType, ResponseErrorType>>} Role's information
 */
export const getRoleByName = async (
  role: string
): Promise<Result<RoleType, ResponseErrorType>> => {
  try {
    const option: FindOptions<RoleAttributes> = {
      where: {
        role,
      },
    };

    const result = await RoleRepository.findOne(option);

    if (!result) {
      return err({
        status: 404,
        message: `Role: ${role} not found`,
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
 * Get role by id
 *
 * @param {string} id
 * @returns {Promise<Result<RoleType, ResponseErrorType>>} Role's information
 */
export const getRoleById = async (
  id: string
): Promise<Result<RoleType, ResponseErrorType>> => {
  try {
    const option: FindOptions<RoleAttributes> = {
      where: {
        id,
      },
    };

    const result = await RoleRepository.findOne(option);

    if (!result) {
      return err({
        status: 404,
        message: `Role id: ${id} not found`,
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

export default {
  getRoleByName,
  getRoleById,
};
