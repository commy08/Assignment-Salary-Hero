import {
  CreateSalaryInputType,
  CreateSalaryType,
  SalaryAttributes,
  SalaryType,
} from "../types/salary.interface";

export const transformSalary = (salary: SalaryAttributes): SalaryType => {
  return {
    id: salary.id,
    userCompanyRoleId: salary.user_company_role_id,
    amount: salary.amount,
    createdAt: salary.created_at,
    updatedAt: salary.updated_at,
  };
};

export const transformCreateSalary = (
  salary: CreateSalaryInputType
): CreateSalaryType => {
  return {
    amount: salary.amount,
    user_company_role_id: salary.userCompanyRoleId,
  };
};
