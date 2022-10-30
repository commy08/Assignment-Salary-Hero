import { DataTypes, Model, UUIDV4 } from "sequelize";
import { exampleSequelize } from "../config/database";
import type {
  CompanyAttributes,
  CompanyInput,
} from "../types/company.interface";

/**
 * Company's model
 */
class Company
  extends Model<CompanyAttributes, CompanyInput>
  implements CompanyAttributes
{
  /**
   * Company's ID
   */
  id: string;

  /**
   * Company's name
   */
  name: string;

  created_at!: Date;

  updated_at!: Date;

  deleted_at?: Date;
}

Company.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: exampleSequelize,
    modelName: "Company",
    tableName: "companies",
  }
);

export default Company;
