import Company from "./company.model";
import Role from "./role.model";
import User from "./user.model";
import UserCompanyRole from "./userCompanyRole.model";
import relation from "./example.relation";

export const Models = {
  Company,
  Role,
  User,
  UserCompanyRole,
};

export type ModelType = typeof Models;

relation(Models);
