import BigNumber from "bignumber.js";
import { err, ok, Result } from "neverthrow";
import { FindOptions } from "sequelize";
import { transformCreateTransaction } from "../dto/transaction..dto";
import { TransactionRepository } from "../repositories";
import { ResponseErrorType } from "../types/base.interface";
import {
  CreateTransactionInputType,
  TransactionAttributes,
  TransactionType,
} from "../types/transaction.interface";

/**
 * Create new transaction
 *
 * @param {CreateTransactionInputType} transaction
 * @returns {Promise<Result<TransactionType, ResponseErrorType>>} create transaction
 */
export const createTransaction = async (
  transaction: CreateTransactionInputType
): Promise<Result<TransactionType, ResponseErrorType>> => {
  try {
    const companyTransform = transformCreateTransaction(transaction);

    const result = await TransactionRepository.create(companyTransform);

    return ok(result);
  } catch (error) {
    return err({
      status: 500,
      message: error.message,
    });
  }
};

/**
 * Get transactions by id
 *
 * @param {string} id
 * @returns {Promise<Result<RoleType, ResponseErrorType>>} Role's information
 */
export const getTransactionsById = async (
  id: string
): Promise<Result<TransactionType[], ResponseErrorType>> => {
  try {
    const option: FindOptions<TransactionAttributes> = {
      where: { form: id },
    };

    const result = await TransactionRepository.findAll(option);

    return ok(result);
  } catch (error) {
    return err({
      status: 500,
      message: error.message,
    });
  }
};

/**
 * Get sum amount
 *
 * @param {TransactionType[]} transactions
 * @returns {Promise<Result< BigNumber, ResponseErrorType>>} sum amount
 */
export const sumAmount = async (
  transactions: TransactionType[]
): Promise<Result<BigNumber, ResponseErrorType>> => {
  try {
    let sum: BigNumber = new BigNumber(0);

    for (let index = 0; index < transactions.length; index++) {
      const transaction = transactions[index];

      const amount = new BigNumber(transaction.amount);
      sum = amount.plus(sum);
    }

    return ok(sum);
  } catch (error) {
    return err({
      status: 500,
      message: error.message,
    });
  }
};

export default {
  createTransaction,
  getTransactionsById,
  sumAmount,
};
