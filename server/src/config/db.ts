import sqlite3 from "sqlite3";
import { dbDatabase } from "./configEnv";

sqlite3.verbose();

export const db = new sqlite3.Database(dbDatabase!, (err) => {
    if(err){
        console.log(err);
    }else{
        console.log("connected to Database")
    }
})

const createNewTable = "create table if not exists models(modelid integer primary key AUTOINCREMENT, uuid text, url text)";
db.run(createNewTable, (err) => {
    if(err){
        console.log(err);
    }else{
        console.log("Table created or already exists");
    }
})


