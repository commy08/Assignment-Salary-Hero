import express from "express";
import { TransactionController } from "../controllers";
import {
  JOI_OPTIONS,
  validateSchemaMiddleware,
} from "../middlewares/validation";

import transactionValidate from "../validators/transaction.validate";

const transactionRouter: express.Router = express.Router();

/**
 * @typedef {object} CreateTransactionBodyType
 * @property {string} to - The target of transfer
 * @property {string} amount - The amount
 */

/**
 * @typedef {object} TransactionType
 * @property {string} form - The target of transfer
 * @property {string} to - The target of transfer
 * @property {string} amount - The amount
 * @property {string} createdAt - Transaction create at
 * @property {string} updatedAt - Transaction update at
 */

/**
 * POST /api/transaction
 * @tags transaction
 * @param {CreateTransactionBodyType} request.body.required - CreateTransactionBodyType
 * @return {TransactionType} 200 - TransactionType response
 */
transactionRouter.post(
  "/",
  validateSchemaMiddleware({
    options: JOI_OPTIONS.body,
    schema: transactionValidate.createTransactionSchema,
  }),
  TransactionController.createTransaction
);

export default transactionRouter;
