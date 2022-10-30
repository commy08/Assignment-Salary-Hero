// import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from './dotenv';
require("dotenv").config();

module.exports = {
  local: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    seederStorage: "sequelize",
  },
};
