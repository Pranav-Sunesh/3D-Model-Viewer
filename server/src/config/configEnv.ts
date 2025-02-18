import { configDotenv } from "dotenv";

configDotenv();
export const PORT = process.env.PORT;
export const dbDatabase = process.env.DB_DATABASE;