import { DataTypes, Model, UUIDV4 } from "sequelize";
import { exampleSequelize } from "../config/database";
import {
  TransactionAttributes,
  TransactionInput,
} from "../types/transaction.interface";

/**
 * Transaction's model
 */
class Transaction
  extends Model<TransactionAttributes, TransactionInput>
  implements TransactionAttributes
{
  /**
   * Transaction's ID
   */
  id: string;

  /**
   * Transfer form
   */
  form: string;

  /**
   * Transfer to
   */
  to: string;

  /**
   * Salary's amount
   */
  amount: string;

  created_at!: Date;

  updated_at!: Date;

  deleted_at?: Date;
}

Transaction.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
      defaultValue: UUIDV4,
    },
    form: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    to: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    amount: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: exampleSequelize,
    modelName: "Transaction",
    tableName: "Transactions",
  }
);

export default Transaction;
