import { Request, Response } from "express";
import { CommonServices, CompanyServices } from "../services";
import {
  CreateCompanyBodyType,
  UpdateCompanyBodyType,
} from "../types/company.interface";

/**
 * Create company
 * @async
 * @param {Request} request
 * @param {Response} response
 */
export const createCompany = async (request: Request, response: Response) => {
  const { name } = request.body as CreateCompanyBodyType;

  const company = await CompanyServices.createCompany({ name });

  if (company.isErr()) {
    return response.status(company.error.status).send(company.error);
  }

  return response.send(company.value);
};

/**
 * Get companies
 * @async
 * @param {Request} request
 * @param {Response} response
 */
export const getCompanies = async (request: Request, response: Response) => {
  const { limit, offset } = CommonServices.getPaginationFromHeaders(request);

  const company = await CompanyServices.getCompaniesAndTotal({ limit, offset });

  if (company.isErr()) {
    return response.status(company.error.status).send(company.error);
  }

  return response.send(company.value);
};

/**
 * Get company by id
 * @async
 * @param {Request} request
 * @param {Response} response
 */
export const getCompanyById = async (request: Request, response: Response) => {
  const { id } = request.params;

  const company = await CompanyServices.getCompanyById(id);

  if (company.isErr()) {
    return response.status(company.error.status).send(company.error);
  }

  return response.send(company.value);
};

/**
 * Update company information
 * @async
 * @param {Request} request
 * @param {Response} response
 */
export const updateCompanyInformation = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;
  const { name } = request.body as UpdateCompanyBodyType;

  const company = await CompanyServices.updateCompanyInformation({ id, name });

  if (company.isErr()) {
    return response.status(company.error.status).send(company.error);
  }

  return response.send(company.value);
};

/**
 * Delete company
 * @async
 * @param {Request} request
 * @param {Response} response
 */
export const destroyCompany = async (request: Request, response: Response) => {
  const { id } = request.params;

  const company = await CompanyServices.deleteCompanyById(id);

  if (company.isErr()) {
    return response.status(company.error.status).send(company.error);
  }

  return response.send({
    message: "Delete Successful",
  });
};

/**
 * Restore company
 * @async
 * @param {Request} request
 * @param {Response} response
 */
export const restoreCompany = async (request: Request, response: Response) => {
  const { id } = request.params;

  const company = await CompanyServices.restoreCompanyById(id);

  if (company.isErr()) {
    return response.status(company.error.status).send(company.error);
  }

  return response.send({
    message: "Restore Successful",
  });
};

export default {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompanyInformation,
  destroyCompany,
  restoreCompany,
};
