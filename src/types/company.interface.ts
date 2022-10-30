import { Optional } from "sequelize";

export type CompanyAttributes = {
  id: string;
  name: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export type CompanyInput = Optional<CompanyAttributes, "id">;
export type CompanyOutput = Required<CompanyAttributes>;

export type CreateCompanyType = {
  name: string;
};

export type CreateCompanyInputType = CreateCompanyType;

export type CompanyType = {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type FindAndCountCompaniesInputType = {
  limit: number;
  offset: number;
};

export type CompanyUpdateParamsType = {
  values: Omit<Partial<CompanyAttributes>, "id">;
  id: string;
};

export type CompanyUpdateInputType = {
  name: string;
  id: string;
};

export type CompaniesFindAndCountAllType = {
  companies: CompanyType[];
  total: number;
};

export type CreateCompanyBodyType = {
  name: string;
};

export type UpdateCompanyBodyType = CreateCompanyBodyType;
