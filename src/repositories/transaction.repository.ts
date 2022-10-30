import { FindOptions } from "sequelize";
import {
  transformTransaction,
  transformTransactions,
} from "../dto/transaction..dto";
import Transaction from "../models/transation.model";
import {
  CreateTransactionType,
  TransactionAttributes,
  TransactionType,
} from "../types/transaction.interface";

/**
 * Create transaction information
 *
 * @param {CreateTransactionType} transaction
 * @returns {Promise<TransactionType>} transaction
 */
export const create = async (
  transaction: CreateTransactionType
): Promise<TransactionType> => {
  const result = await Transaction.create(transaction);

  return transformTransaction(result);
};

/**
 * Get transactions information
 *
 * @param {CreateTransactionType} transaction
 * @returns {Promise<TransactionType>} transaction
 */
export const findAll = async (
  options: FindOptions<TransactionAttributes>
): Promise<TransactionType[]> => {
  const result = await Transaction.findAll(options);

  return transformTransactions(result);
};

export default {
  create,
  findAll,
};
