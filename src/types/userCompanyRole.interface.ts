import { Optional } from "sequelize";
import { RoleTypeEnum } from "./role.enum";

export type UserCompanyRoleAttributes = {
  id: string;
  user_id: string;
  company_id: string;
  role_id: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export type CreateUserCompanyRoleType = {
  id?: string;
  user_id: string;
  role_id: string;
  company_id: string;
};

export type UserCompanyRoleType = {
  id: string;
  userId: string;
  roleId: string;
  companyId: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserCompanyRoleInput = Optional<UserCompanyRoleAttributes, "id">;
export type UserCompanyRoleOutput = Required<UserCompanyRoleAttributes>;

export type CreateUserCompanyRoleInputType = {
  userId: string;
  roleId: string;
  companyId: string;
};

export type CheckUserRoleType = {
  id: string;
  role: RoleTypeEnum.ADMIN | RoleTypeEnum.EMPLOYEE | RoleTypeEnum.SUPER_ADMIN;
};
