import { DataTypes, Model, UUIDV4 } from "sequelize";
import { exampleSequelize } from "../config/database";
import type { UserAttributes, UserInput } from "../types/user.interface";

/**
 * User's model
 */
class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  /**
   * User's ID
   */
  id: string;

  /**
   * User's nationalID
   */
  national_id: string;

  /**
   * User's first name
   */
  first_name: string;

  /**
   * User's last name
   */
  last_name: string;

  created_at!: Date;

  updated_at!: Date;

  deleted_at?: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      unique: true,
      defaultValue: UUIDV4,
    },
    national_id: {
      primaryKey: true,
      type: DataTypes.STRING,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: exampleSequelize,
    modelName: "User",
    tableName: "users",
  }
);

export default User;
