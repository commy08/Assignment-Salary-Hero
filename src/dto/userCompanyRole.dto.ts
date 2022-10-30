import type {
  CreateUserCompanyRoleInputType,
  UserCompanyRoleAttributes,
  UserCompanyRoleType,
  CreateUserCompanyRoleType,
} from "../types/userCompanyRole.interface";

export const transformUserCompanyRole = (
  userCompanyRole: UserCompanyRoleAttributes
): UserCompanyRoleType => {
  return {
    id: userCompanyRole.id,
    userId: userCompanyRole.user_id,
    companyId: userCompanyRole.company_id,
    roleId: userCompanyRole.role_id,
    createdAt: userCompanyRole.created_at,
    updatedAt: userCompanyRole.updated_at,
  };
};

export const transformUserCompanyRoles = (
  userCompanyRoles: UserCompanyRoleAttributes[]
): UserCompanyRoleType[] => {
  return userCompanyRoles.map((userCompanyRole) =>
    transformUserCompanyRole(userCompanyRole)
  );
};

export const transformCreateUserCompanyRoleInputType = (
  userCompanyRole: CreateUserCompanyRoleInputType
): CreateUserCompanyRoleType => {
  return {
    company_id: userCompanyRole.companyId,
    user_id: userCompanyRole.userId,
    role_id: userCompanyRole.roleId,
  };
};
