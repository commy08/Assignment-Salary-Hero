import { Optional } from 'sequelize';
import { RoleTypeEnum } from './role.enum';

export type RoleType = {
  id: string;
  role: RoleTypeEnum;
  createdAt?: Date;
  updatedAt?: Date;
};

export type RoleAttributes = {
  id: string;
  role: RoleTypeEnum;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export type RoleInput = Optional<RoleAttributes, 'id'>;
export type RoleOutput = Required<RoleAttributes>;
