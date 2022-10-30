import { Optional } from "sequelize";

export type TransactionAttributes = {
  id: string;
  form: string;
  to: string;
  amount: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export type TransactionInput = Optional<TransactionAttributes, "id">;
export type TransactionOutput = Required<TransactionAttributes>;

export type CreateTransactionType = {
  form: string;
  to: string;
  amount: string;
};

export type CreateTransactionInputType = CreateTransactionType;

export type TransactionType = {
  id: string;
  form: string;
  to: string;
  amount: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CreateTransactionBodyType = {
  to: string;
  amount: string;
};
