import { err, ok, Result } from "neverthrow";
import {
  DestroyOptions,
  FindAndCountOptions,
  FindOptions,
  RestoreOptions,
} from "sequelize";
import { transformCreateCompany } from "../dto/company.dto";
import { CompanyRepository } from "../repositories";
import type {
  CompaniesFindAndCountAllType,
  CompanyAttributes,
  CompanyType,
  CompanyUpdateInputType,
  CompanyUpdateParamsType,
  CreateCompanyInputType,
  FindAndCountCompaniesInputType,
} from "../types/company.interface";
import type { ResponseErrorType } from "../types/service.interface";

/**
 * Create new company
 *
 * @param {CreateCompanyInputType} company
 * @returns {Promise<Result<CompanyType, ResponseErrorType>>} create company
 */
export const createCompany = async (
  company: CreateCompanyInputType
): Promise<Result<CompanyType, ResponseErrorType>> => {
  try {
    const companyTransform = transformCreateCompany(company);

    const result = await CompanyRepository.create(companyTransform);

    return ok(result);
  } catch (error) {
    return err({
      status: 500,
      message: error.message,
    });
  }
};

/**
 * Update company information
 *
 * @param {CompanyUpdateParamsType} options
 * @returns {Promise<Result<CompanyType, ResponseErrorType>>} update company information
 */
export const updateCompanyInformation = async ({
  name,
  id,
}: CompanyUpdateInputType): Promise<Result<CompanyType, ResponseErrorType>> => {
  try {
    const options: CompanyUpdateParamsType = {
      id,
      values: {
        name,
      },
    };

    const result = await CompanyRepository.updateById(options);

    return ok(result);
  } catch (error) {
    return err({
      status: 500,
      message: error.message,
    });
  }
};

/**
 * Get all companies information
 *
 * @param {FindAndCountCompaniesInputType} options
 * @param {string} options.limit
 * @param {string} options.offset
 * @returns {Promise<Result<CompaniesFindAndCountAllType, ResponseErrorType>>} Get all companies information
 */
export const getCompaniesAndTotal = async ({
  limit,
  offset,
}: FindAndCountCompaniesInputType): Promise<
  Result<CompaniesFindAndCountAllType, ResponseErrorType>
> => {
  try {
    const options: FindAndCountOptions<CompanyAttributes> = {
      limit,
      offset,
    };

    const result = await CompanyRepository.findAndCountAll(options);

    return ok(result);
  } catch (error) {
    return err({
      status: 500,
      message: error.message,
    });
  }
};

/**
 * Get company information by Id
 *
 * @param {string} id
 * @returns {Promise<Result<CompanyType, ResponseErrorType>>} Get company information
 */
export const getCompanyById = async (
  id: string
): Promise<Result<CompanyType, ResponseErrorType>> => {
  try {
    const options: FindOptions<CompanyAttributes> = {
      where: { id },
    };

    const result = await CompanyRepository.findOne(options);

    if (!result) {
      return err({
        status: 404,
        message: `Company id : ${id}  not found`,
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
 * Delete company by Id
 *
 * @param {string} id
 * @returns {Promise<Result<number, ResponseErrorType>>} Delete company
 */
export const deleteCompanyById = async (
  id: string
): Promise<Result<number, ResponseErrorType>> => {
  try {
    const options: DestroyOptions<CompanyAttributes> = {
      where: { id },
    };

    const result = await CompanyRepository.destroy(options);

    return ok(result);
  } catch (error) {
    return err({
      status: 500,
      message: error.message,
    });
  }
};

/**
 * Restore company by Id
 *
 * @param {string} id
 * @returns {Promise<Result<void, ResponseErrorType>>} Restore company
 */
export const restoreCompanyById = async (
  id: string
): Promise<Result<void, ResponseErrorType>> => {
  try {
    const options: RestoreOptions<CompanyAttributes> = {
      where: { id },
    };

    const result = await CompanyRepository.restore(options);

    return ok(result);
  } catch (error) {
    return err({
      status: 500,
      message: error.message,
    });
  }
};

export default {
  createCompany,
  updateCompanyInformation,
  getCompaniesAndTotal,
  getCompanyById,
  deleteCompanyById,
  restoreCompanyById,
};
