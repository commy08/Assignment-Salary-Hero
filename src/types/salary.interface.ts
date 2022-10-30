import { Optional } from "sequelize";

export type SalaryAttributes = {
  id: string;
  user_company_role_id: string;
  amount: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export type SalaryInput = Optional<SalaryAttributes, "id">;
export type SalaryOutput = Required<SalaryAttributes>;

export type CreateSalaryType = {
  user_company_role_id: string;
  amount: string;
};

export type CreateSalaryInputType = {
  userCompanyRoleId: string;
  amount: string;
};

export type SalaryType = {
  id: string;
  userCompanyRoleId: string;
  amount: string;
  createdAt?: Date;
  updatedAt?: Date;
};
