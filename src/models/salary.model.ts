import { DataTypes, Model, UUIDV4 } from "sequelize";
import { exampleSequelize } from "../config/database";
import { SalaryAttributes, SalaryInput } from "../types/salary.interface";

/**
 * Salary's model
 */
class Salary
  extends Model<SalaryAttributes, SalaryInput>
  implements SalaryAttributes
{
  /**
   * Salary's ID
   */
  id: string;

  /**
   * UserCompanyRole's ID
   */
  user_company_role_id: string;

  /**
   * Salary's amount
   */
  amount: string;

  created_at!: Date;

  updated_at!: Date;

  deleted_at?: Date;
}

Salary.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
      defaultValue: UUIDV4,
    },
    user_company_role_id: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    amount: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: exampleSequelize,
    modelName: "Salary",
    tableName: "salaries",
  }
);

export default Salary;
