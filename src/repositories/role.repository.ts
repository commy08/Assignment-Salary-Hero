import { FindOptions } from "sequelize";
import { transformRole } from "../dto/role.dto";
import Role from "../models/role.model";
import { RoleAttributes, RoleType } from "../types/role.interface";

/**
 * Get Role information
 *
 * @param {FindOptions<RoleType>} options
 * @returns {Promise<RoleType | null>} Role
 */
export const findOne = async (
  options: FindOptions<RoleAttributes>
): Promise<RoleType | null> => {
  const role = await Role.findOne(options);

  return role ? transformRole(role) : null;
};

export default {
  findOne,
};
