import { FindAndCountAllResponseType } from "../types/base.interface";
import type {
  CompaniesFindAndCountAllType,
  CompanyAttributes,
  CompanyType,
  CreateCompanyInputType,
  CreateCompanyType,
} from "../types/company.interface";

export const transformCompany = (company: CompanyAttributes): CompanyType => {
  return {
    id: company.id,
    name: company.name,
    createdAt: company.created_at,
    updatedAt: company.updated_at,
  };
};

export const transformCreateCompany = (
  company: CreateCompanyInputType
): CreateCompanyType => {
  return { name: company.name };
};

export const transformCompanies = (
  companies: CompanyAttributes[]
): CompanyType[] => {
  return companies.map((company) => {
    return {
      id: company.id,
      name: company.name,
      createdAt: company.created_at,
      updatedAt: company.updated_at,
    };
  });
};

export const transformCompaniesFindAndCountAll = ({
  rows,
  count,
}: FindAndCountAllResponseType<CompanyAttributes>): CompaniesFindAndCountAllType => {
  const companies = transformCompanies(rows);

  return {
    companies,
    total: count,
  };
};
