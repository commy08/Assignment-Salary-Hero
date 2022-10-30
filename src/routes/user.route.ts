import express from "express";
import { UserController } from "../controllers";
import { checkUserRoleMiddleware } from "../middlewares/checkUserRole";
import {
  JOI_OPTIONS,
  validateSchemaMiddleware,
} from "../middlewares/validation";
import { RoleTypeEnum } from "../types/role.enum";
import userValidator from "../validators/user.validator";

const userRouter: express.Router = express.Router();

/**
 * @typedef {object} CreateUserBodyType
 * @property {string} companyId - The company's ID
 * @property {string} firstName - The user's first name
 * @property {string} lastName - The user's last name
 * @property {string} nationalId - The user's national id
 */

/**
 * @typedef {object} UserType
 * @property {string} id - The user's ID
 * @property {string} firstName - The user's first name
 * @property {string} lastName - The user's last name
 * @property {string} nationalId - The user's national id
 */

/**
 * @typedef {object} UpdateUserBodyType
 * @property {string} firstName - The user's first name
 * @property {string} lastName - The user's last name
 * @property {string} nationalId - The user's national id
 */

/**
 * @typedef {object} CreateUserType
 * @property {string} id - The userCompanyRole's ID
 * @property {string} userId - The user's ID
 * @property {string} companyId - The company's ID
 * @property {string} roleId - The role's ID
 */

/**
 * POST /api/user/admin
 * @tags user
 * @param {CreateUserBodyType} request.body.required - CreateUserType
 * @return {CreateUserType} 200 - userCompanyRole response
 */
userRouter.post(
  "/admin",
  checkUserRoleMiddleware(RoleTypeEnum.SUPER_ADMIN),
  validateSchemaMiddleware({
    options: JOI_OPTIONS.body,
    schema: userValidator.createUserSchema,
  }),
  UserController.createAdminForCompany
);

/**
 * POST /api/user/employee
 * @tags user
 * @param {CreateUserBodyType} request.body.required - CreateUserType
 * @return {CreateUserType} 200 - userCompanyRole response
 */
userRouter.post(
  "/employee",
  checkUserRoleMiddleware(RoleTypeEnum.ADMIN),
  validateSchemaMiddleware({
    options: JOI_OPTIONS.body,
    schema: userValidator.createUserSchema,
  }),
  UserController.createEmployeeForCompany
);

/**
 * GET /api/user/company/{id}
 * @tags user
 * @param {string} id.path.required - The company's id
 * @return {Array<UserType>} 200 - user response
 */
userRouter.get(
  "/company/:id",
  checkUserRoleMiddleware(RoleTypeEnum.ADMIN),
  UserController.getUsersByCompanyId
);

/**
 * PUT /api/user/
 * @tags user
 * @param {UpdateUserBodyType} request.body.required - The user's update body type
 * @return {UserType} 200 - user response
 */
userRouter.put(
  "/",
  checkUserRoleMiddleware(RoleTypeEnum.ADMIN),
  validateSchemaMiddleware({
    options: JOI_OPTIONS.body,
    schema: userValidator.updateUserSchema,
  }),
  UserController.updateUserInformation
);

/**
 * PATCH /api/user/{id}/delete
 * @tags user
 * @param {string} id.path.required - The user's id
 * @return {number} 200 - user response
 */
userRouter.patch(
  "/:id/delete",
  checkUserRoleMiddleware(RoleTypeEnum.ADMIN),
  UserController.destroyUser
);

/**
 * PATCH /api/user/{id}/restore
 * @tags user
 * @param {string} id.path.required - The user's id
 * @return {number} 200 - user response
 */
userRouter.patch(
  "/:id/restore",
  checkUserRoleMiddleware(RoleTypeEnum.ADMIN),
  UserController.restoreUser
);

export default userRouter;
