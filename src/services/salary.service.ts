import { Result, err, ok } from "neverthrow";
import { FindOptions } from "sequelize";
import { transformCreateSalary } from "../dto/salary.dto";
import { SalaryRepository } from "../repositories";
import { ResponseErrorType } from "../types/base.interface";
import {
  CreateSalaryInputType,
  SalaryAttributes,
  SalaryType,
} from "../types/salary.interface";

/**
 * Create new salary
 *
 * @param {CreateSalaryInputType} salary
 * @returns {Promise<Result<SalaryType, ResponseErrorType>>} create salary
 */
export const createSalary = async (
  salary: CreateSalaryInputType
): Promise<Result<SalaryType, ResponseErrorType>> => {
  try {
    const companyTransform = transformCreateSalary(salary);

    const result = await SalaryRepository.create(companyTransform);

    return ok(result);
  } catch (error) {
    return err({
      status: 500,
      message: error.message,
    });
  }
};

/**
 * Get salary by userCompanyRole's id
 *
 * @param {string} id
 * @returns {Promise<Result<SalaryType, ResponseErrorType>>} Salary's information
 */
export const getSalaryById = async (
  id: string
): Promise<Result<SalaryType, ResponseErrorType>> => {
  try {
    const option: FindOptions<SalaryAttributes> = {
      where: { user_company_role_id: id },
    };

    const result = await SalaryRepository.findOne(option);

    if (!result) {
      return err({
        status: 404,
        message: `Salary id: ${id} not found`,
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
  createSalary,
  getSalaryById,
};
