import {
  DestroyOptions,
  FindAndCountOptions,
  FindOptions,
  RestoreOptions,
} from "sequelize";
import {
  transformCompaniesFindAndCountAll,
  transformCompany,
} from "../dto/company.dto";
import Company from "../models/company.model";
import type {
  CompaniesFindAndCountAllType,
  CompanyAttributes,
  CompanyType,
  CompanyUpdateParamsType,
  CreateCompanyType,
} from "../types/company.interface";

/**
 * Create Company
 *
 * @param {CreateCompanyType} company
 * @returns {CompanyType} Create company
 */
export const create = async (
  company: CreateCompanyType
): Promise<CompanyType> => {
  const createCompany = await Company.create(company);

  return transformCompany(createCompany);
};

/**
 * Get Company Information
 *
 * @param {FindOptions<CompanyAttributes>} options
 * @returns {Promise<CompanyType | null>} Find company
 */
export const findOne = async (
  options: FindOptions<CompanyAttributes>
): Promise<CompanyType | null> => {
  const company = await Company.findOne(options);

  return company ? transformCompany(company) : null;
};

/**
 * Get Companies Information
 *
 * @param {FindAndCountOptions<CompanyAttributes>} options
 * @returns {CompaniesFindAndCountAllType} Find and count all companies
 */
export const findAndCountAll = async (
  options: FindAndCountOptions<CompanyAttributes>
): Promise<CompaniesFindAndCountAllType> => {
  const companies = await Company.findAndCountAll(options);

  return transformCompaniesFindAndCountAll(companies);
};

/**
 * Update company Information by Id
 *
 * @param {CompanyUpdateParamsType} options
 * @returns {Promise<CompanyType>} update company by Id
 */
export const updateById = async ({
  values,
  id,
}: CompanyUpdateParamsType): Promise<CompanyType> => {
  const [, companies] = await Company.update(values, {
    where: { id },
    returning: true,
  });

  return transformCompany(companies[0]);
};

/**
 * Destroy company by Id
 *
 * @param {DestroyOptions<CompanyAttributes>} options
 * @returns {Promise<number>} destroy company by Id
 */
export const destroy = async (
  options: DestroyOptions<CompanyAttributes>
): Promise<number> => {
  const result = Company.destroy(options);

  return result;
};

/**
 * Restore company by Id
 *
 * @param {RestoreOptions<CompanyAttributes>} options
 * @returns {Promise<void>} restore company by Id
 */
export const restore = async (
  options: RestoreOptions<CompanyAttributes>
): Promise<void> => {
  const result = Company.restore(options);

  return result;
};

export default {
  create,
  findOne,
  findAndCountAll,
  updateById,
  destroy,
  restore,
};
