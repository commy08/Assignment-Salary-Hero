import type { RoleAttributes, RoleType } from '../types/role.interface';

export const transformRole = (role: RoleAttributes): RoleType => {
  return {
    id: role.id,
    role: role.role,
    createdAt: role.created_at,
    updatedAt: role.updated_at,
  };
};

export const transformRoles = (roles: RoleAttributes[]): RoleType[] => {
  return roles.map((role) => transformRole(role));
};
