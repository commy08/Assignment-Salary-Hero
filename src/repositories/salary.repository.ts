import { FindOptions } from "sequelize";
import { transformSalary } from "../dto/salary.dto";
import Salary from "../models/salary.model";
import {
  CreateSalaryType,
  SalaryAttributes,
  SalaryType,
} from "../types/salary.interface";

/**
 * Create Salary information
 *
 * @param {CreateSalaryType} salary
 * @returns {Promise<SalaryType>} salary
 */
export const create = async (salary: CreateSalaryType): Promise<SalaryType> => {
  const result = await Salary.create(salary);

  return transformSalary(result);
};

/**
 * Get Salary information
 *
 * @param {FindOptions<SalaryAttributes>} options
 * @returns {Promise<RoleType | null>} salary
 */
export const findOne = async (
  options: FindOptions<SalaryAttributes>
): Promise<SalaryType | null> => {
  const role = await Salary.findOne(options);

  return role ? transformSalary(role) : null;
};

export default {
  create,
  findOne,
};
