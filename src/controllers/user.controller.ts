import { Request, Response } from "express";
import {
  CommonServices,
  CompanyServices,
  RoleServices,
  SalaryServices,
  UserCompanyRoleServices,
  UserServices,
} from "../services";
import { RequestHeadersType } from "../types/base.interface";
import { RoleTypeEnum } from "../types/role.enum";
import {
  CreateUserForCompanyBodyType,
  UpdateUserBodyType,
} from "../types/user.interface";

/**
 * Create admin for company
 * @async
 * @param {Request} request
 * @param {Response} response
 */
export const createAdminForCompany = async (
  request: Request,
  response: Response
) => {
  const { nationalId, firstName, lastName, companyId, salary } =
    request.body as CreateUserForCompanyBodyType;

  const company = await CompanyServices.getCompanyById(companyId);

  if (company.isErr()) {
    return response.status(company.error.status).send(company.error);
  }

  const user = await UserServices.upsertUser({
    nationalId,
    firstName,
    lastName,
  });

  if (user.isErr()) {
    return response.status(user.error.status).send(user.error);
  }

  const role = await RoleServices.getRoleByName(RoleTypeEnum.ADMIN);

  if (role.isErr()) {
    return response.status(role.error.status).send(role.error);
  }

  const userCompanyRole = await UserCompanyRoleServices.createUserCompanyRole({
    companyId,
    roleId: role.value.id,
    userId: user.value.id,
  });

  if (userCompanyRole.isErr()) {
    return response
      .status(userCompanyRole.error.status)
      .send(userCompanyRole.error);
  }

  const createSalary = await SalaryServices.createSalary({
    userCompanyRoleId: userCompanyRole.value.id,
    amount: salary,
  });

  if (createSalary.isErr()) {
    return response.status(createSalary.error.status).send(createSalary.error);
  }

  return response.send(userCompanyRole.value);
};

/**
 * Create employee for company
 * @async
 * @param {Request} request
 * @param {Response} response
 */
export const createEmployeeForCompany = async (
  request: Request,
  response: Response
) => {
  const { nationalId, firstName, lastName, companyId, salary } =
    request.body as CreateUserForCompanyBodyType;

  const company = await CompanyServices.getCompanyById(companyId);

  if (company.isErr()) {
    return response.status(company.error.status).send(company.error);
  }

  const user = await UserServices.upsertUser({
    nationalId,
    firstName,
    lastName,
  });

  if (user.isErr()) {
    return response.status(user.error.status).send(user.error);
  }

  const role = await RoleServices.getRoleByName(RoleTypeEnum.ADMIN);

  if (role.isErr()) {
    return response.status(role.error.status).send(role.error);
  }

  const userCompanyRole = await UserCompanyRoleServices.createUserCompanyRole({
    companyId,
    roleId: role.value.id,
    userId: user.value.id,
  });

  if (userCompanyRole.isErr()) {
    return response
      .status(userCompanyRole.error.status)
      .send(userCompanyRole.error);
  }

  const createSalary = await SalaryServices.createSalary({
    userCompanyRoleId: userCompanyRole.value.id,
    amount: salary,
  });

  if (createSalary.isErr()) {
    return response.status(createSalary.error.status).send(createSalary.error);
  }

  return response.send(userCompanyRole.value);
};

/**
 * Get users by company
 * @async
 * @param {Request} request
 * @param {Response} response
 */
export const getUsersByCompanyId = async (
  request: Request,
  response: Response
) => {
  const { limit, offset } = CommonServices.getPaginationFromHeaders(request);
  const { usercompanyrole: userCompanyRoleId } =
    request.headers as RequestHeadersType;

  const userCompanyRole = await UserCompanyRoleServices.getUserCompanyRoleById(
    userCompanyRoleId
  );

  if (userCompanyRole.isErr()) {
    return response
      .status(userCompanyRole.error.status)
      .send(userCompanyRole.error);
  }

  const { companyId } = userCompanyRole.value;

  const userCompanyRoles =
    await UserCompanyRoleServices.getUserCompanyRoleByCompanyId(companyId);

  if (userCompanyRoles.isErr()) {
    return response
      .status(userCompanyRoles.error.status)
      .send(userCompanyRoles.error);
  }

  const userIds = userCompanyRoles.value.map(
    (userCompanyRole) => userCompanyRole.userId
  );

  const users = await UserServices.getUsersByIds({
    limit,
    offset,
    ids: userIds,
  });

  if (users.isErr()) {
    return response.status(users.error.status).send(users.error);
  }

  return response.send(users.value);
};

/**
 * Update users by id
 * @async
 * @param {Request} request
 * @param {Response} response
 */
export const updateUserInformation = async (
  request: Request,
  response: Response
) => {
  const { nationalId, firstName, lastName } =
    request.body as UpdateUserBodyType;

  const user = await UserServices.upsertUser({
    nationalId,
    firstName,
    lastName,
  });

  if (user.isErr()) {
    return response.status(user.error.status).send(user.error);
  }

  return response.send(user.value);
};

/**
 * Delete user
 * @async
 * @param {Request} request
 * @param {Response} response
 */
export const destroyUser = async (request: Request, response: Response) => {
  const { id } = request.params;

  const company = await UserServices.deleteUserById(id);

  if (company.isErr()) {
    return response.status(company.error.status).send(company.error);
  }

  return response.send({
    message: "Delete Successful",
  });
};

/**
 * Restore user
 * @async
 * @param {Request} request
 * @param {Response} response
 */
export const restoreUser = async (request: Request, response: Response) => {
  const { id } = request.params;

  const company = await UserServices.restoreUserById(id);

  if (company.isErr()) {
    return response.status(company.error.status).send(company.error);
  }

  return response.send({
    message: "Restore Successful",
  });
};

export default {
  createAdminForCompany,
  createEmployeeForCompany,
  getUsersByCompanyId,
  updateUserInformation,
  destroyUser,
  restoreUser,
};
