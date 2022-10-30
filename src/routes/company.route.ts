import express from "express";
import { CompanyController } from "../controllers";
import { checkUserRoleMiddleware } from "../middlewares/checkUserRole";
import {
  JOI_OPTIONS,
  validateSchemaMiddleware,
} from "../middlewares/validation";
import { RoleTypeEnum } from "../types/role.enum";
import companyValidator from "../validators/company.validator";

const companyRouter: express.Router = express.Router();

/**
 * @typedef {object} CompanyType
 * @property {string} id - The company's ID
 * @property {string} name - The company's name
 * @property {string} createdAt - The company's create date
 * @property {string} updatedAt - The company's update date
 */

/**
 * @typedef {object} CreateCompanyType
 * @property {string} name - The company's name
 */

/**
 * @typedef {object} UpdateCompanyType
 * @property {string} name - The company's name
 */

/**
 * @typedef {object} FindAndCountCompanyHeadersType
 * @property {string} offset - offset
 * @property {string} limit - limit
 * @property {string} usercompanyrole - usercompanyrole
 */

/**
 * @typedef {object} CompanyFindAndCountAllType
 * @property {array<CompanyType>} payload - Company's Information
 * @property {number} count - count
 */

/**
 * POST /api/company
 * @tags company
 * @param {CreateCompanyType} request.body.required - CreateCompanyType
 * @return {CompanyType} 200 - company response
 */
companyRouter.post(
  "/",
  checkUserRoleMiddleware(RoleTypeEnum.SUPER_ADMIN),
  validateSchemaMiddleware({
    options: JOI_OPTIONS.body,
    schema: companyValidator.createCompanySchema,
  }),
  CompanyController.createCompany
);

/**
 * GET /api/company
 * @tags company
 * @return {CompanyFindAndCountAllType} 200 - company response
 */
companyRouter.get(
  "/",
  checkUserRoleMiddleware(RoleTypeEnum.SUPER_ADMIN),
  CompanyController.getCompanies
);

/**
 * GET /api/company/{id}
 * @tags company
 * @param {string} id.path.required - The company's id
 * @return {CompanyType} 200 - company response
 */
companyRouter.get(
  "/:id",
  checkUserRoleMiddleware(RoleTypeEnum.SUPER_ADMIN),
  CompanyController.getCompanyById
);

/**
 * PUT /api/company/{id}
 * @tags company
 * @param {string} id.path.required - The company's id
 * @param {UpdateCompanyType} request.body.required - CreateCompanyType
 * @return {CompanyType} 200 - company response
 */
companyRouter.put(
  "/:id",
  checkUserRoleMiddleware(RoleTypeEnum.SUPER_ADMIN),
  validateSchemaMiddleware({
    options: JOI_OPTIONS.body,
    schema: companyValidator.updateCompanySchema,
  }),
  CompanyController.updateCompanyInformation
);

/**
 * PATCH /api/company/{id}/delete
 * @tags company
 * @param {string} id.path.required - The company's id
 * @return {number} 200 - company response
 */
companyRouter.patch(
  "/:id/delete",
  checkUserRoleMiddleware(RoleTypeEnum.SUPER_ADMIN),
  CompanyController.destroyCompany
);

/**
 * PATCH /api/company/{id}/restore
 * @tags company
 * @param {string} id.path.required - The company's id
 * @return {number} 200 - company response
 */
companyRouter.patch(
  "/:id/restore",
  checkUserRoleMiddleware(RoleTypeEnum.SUPER_ADMIN),
  CompanyController.restoreCompany
);

export default companyRouter;
