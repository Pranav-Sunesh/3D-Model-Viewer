import mysql from "mysql2";
import { dbDatabase, dbHost, dbPassword, dbUser } from "./configEnv";

const db = mysql.createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbDatabase
});

export default db