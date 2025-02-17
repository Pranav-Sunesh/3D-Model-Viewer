import { configDotenv } from "dotenv";

configDotenv();
export const PORT = process.env.PORT;
export const dbUser = process.env.DB_USER;
export const dbHost = process.env.DB_HOST;
export const dbPassword = process.env.DB_PASSWORD;
export const dbDatabase = process.env.DB_DATABASE;