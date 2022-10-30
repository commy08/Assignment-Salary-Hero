import {
  CreateTransactionInputType,
  CreateTransactionType,
  TransactionAttributes,
  TransactionType,
} from "../types/transaction.interface";

export const transformTransaction = (
  transaction: TransactionAttributes
): TransactionType => {
  return {
    id: transaction.id,
    form: transaction.form,
    to: transaction.to,
    amount: transaction.amount,
    createdAt: transaction.created_at,
    updatedAt: transaction.updated_at,
  };
};

export const transformTransactions = (
  transactions: TransactionAttributes[]
): TransactionType[] => {
  return transactions.map((transaction) => transformTransaction(transaction));
};

export const transformCreateTransaction = (
  transaction: CreateTransactionInputType
): CreateTransactionType => {
  return {
    amount: transaction.amount,
    form: transaction.form,
    to: transaction.to,
  };
};
