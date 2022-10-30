import * as dotenv from "dotenv";

dotenv.config({ path: `${process.cwd()}/.env` });

export const PROJECT_SITE_URL = process.env.SITE_URL || "";
export const PROJECT_NODE_ENV = process.env.NODE_ENV || "";
export const PROJECT_PORT = process.env.PORT || 3000;
export const DB_NAME = process.env.DB_NAME || "";
export const DB_HOST = process.env.DB_HOST || "";
export const DB_PORT = (process.env.DB_PORT || 5432) as number;
export const DB_USER = process.env.DB_USER || "";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
