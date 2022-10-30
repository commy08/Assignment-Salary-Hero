import { Sequelize, Op } from "sequelize";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./dotenv";

const exampleSequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  logging: false,
  host: DB_HOST,
  port: DB_PORT,
  dialect: "postgres",
  pool: {
    max: 100,
    min: 10,
    acquire: 30000,
    idle: 60 * 60 * 1000,
  },
  dialectOptions: {
    requestTimeout: 30000,
  },
  define: {
    paranoid: true,
    underscored: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  },
});

export { exampleSequelize, Sequelize, Op };
