import { Request, Response } from "express";
import salaryService from "../services/salary.service";
import { RequestHeadersType } from "../types/base.interface";
import { CreateTransactionBodyType } from "../types/transaction.interface";
import BigNumber from "bignumber.js";
import transactionService from "../services/transaction.service";

/**
 * Create transaction
 * @async
 * @param {Request} request
 * @param {Response} response
 */
export const createTransaction = async (
  request: Request,
  response: Response
) => {
  const { amount, to } = request.body as CreateTransactionBodyType;

  const { usercompanyrole: userCompanyRoleId } =
    request.headers as RequestHeadersType;

  const salary = await salaryService.getSalaryById(userCompanyRoleId);

  if (salary.isErr()) {
    return response.status(salary.error.status).send(salary.error);
  }

  const transactions = await transactionService.getTransactionsById(
    userCompanyRoleId
  );

  if (transactions.isErr()) {
    return response.status(transactions.error.status).send(transactions.error);
  }

  const sumAmount = await transactionService.sumAmount(transactions.value);

  if (sumAmount.isErr()) {
    return response.status(sumAmount.error.status).send(sumAmount.error);
  }

  const halfSalary = new BigNumber(salary.value.amount).dividedBy(2);
  const isBalanceMoreThanHalf = halfSalary.isGreaterThanOrEqualTo(
    sumAmount.value.plus(amount)
  );

  if (!isBalanceMoreThanHalf) {
    return response.status(400).send({
      message:
        "The remaining balance cannot be transacted or amount cannot be over 50% of your salary.",
      status: 400,
    });
  }

  const transaction = await transactionService.createTransaction({
    form: userCompanyRoleId,
    to,
    amount,
  });

  if (transaction.isErr()) {
    return response.status(transaction.error.status).send(transaction.error);
  }

  return response.send(transaction.value);
};

export default {
  createTransaction,
};
