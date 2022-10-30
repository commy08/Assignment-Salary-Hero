import { DataTypes, Model, UUIDV4 } from "sequelize";
import { exampleSequelize } from "../config/database";
import type {
  UserCompanyRoleAttributes,
  UserCompanyRoleInput,
} from "../types/userCompanyRole.interface";

/**
 * UserCompanyRole's model
 */
class UserCompanyRole
  extends Model<UserCompanyRoleAttributes, UserCompanyRoleInput>
  implements UserCompanyRoleAttributes
{
  /**
   * UserCompanyRole's ID
   */
  id: string;

  /**
   * user's ID
   */
  user_id: string;

  /**
   * company's ID
   */
  company_id: string;

  /**
   * role's ID
   */
  role_id: string;

  created_at!: Date;

  updated_at!: Date;

  deleted_at?: Date;
}

UserCompanyRole.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
    },
    user_id: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    company_id: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    role_id: {
      allowNull: false,
      type: DataTypes.UUID,
    },
  },
  {
    sequelize: exampleSequelize,
    modelName: "UserCompanyRole",
    tableName: "users_companies_roles",
  }
);

export default UserCompanyRole;
