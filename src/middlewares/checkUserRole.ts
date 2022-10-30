import { NextFunction, Request, Response } from "express";
import { UserCompanyRoleServices } from "../services";
import { RequestHeadersType } from "../types/base.interface";
import { RoleTypeEnum } from "../types/role.enum";

export const checkUserRoleMiddleware = (
  role: RoleTypeEnum.ADMIN | RoleTypeEnum.EMPLOYEE | RoleTypeEnum.SUPER_ADMIN
) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const { usercompanyrole: userCompanyRoleId } =
      request.headers as RequestHeadersType;

    const isSuperUser = await UserCompanyRoleServices.checkUserRole({
      id: userCompanyRoleId,
      role,
    });

    if (isSuperUser.isErr()) {
      return response.status(isSuperUser.error.status).send(isSuperUser.error);
    }

    return next();
  };
};
