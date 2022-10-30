import { DataTypes, Model, UUIDV4 } from "sequelize";
import { exampleSequelize } from "../config/database";
import { RoleTypeEnum } from "../types/role.enum";
import type { RoleAttributes, RoleInput } from "../types/role.interface";

/**
 * Role's model
 */
class Role extends Model<RoleAttributes, RoleInput> implements RoleAttributes {
  /**
   * Role's ID
   */
  id: string;

  /**
   * Role's name
   */
  role: RoleTypeEnum;

  created_at!: Date;

  updated_at!: Date;

  deleted_at?: Date;
}

Role.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
    },
    role: {
      type: DataTypes.ENUM(
        RoleTypeEnum.SUPER_ADMIN,
        RoleTypeEnum.ADMIN,
        RoleTypeEnum.EMPLOYEE
      ),
      allowNull: false,
    },
  },
  {
    sequelize: exampleSequelize,
    modelName: "Role",
    tableName: "roles",
  }
);

export default Role;
