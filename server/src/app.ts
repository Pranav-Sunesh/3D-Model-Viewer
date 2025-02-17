import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import path from "path";
import db from "./config/db";

const app: Application = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/models',express.static(path.join(__dirname, '../models')) )
console.log(__dirname);

//Database
db.connect((err) => {
    if(err){
        console.log("Error connecting to database");
        return;
    }else{
        console.log("Successfuly connected to database");
    }
})

//Routes
app.use("/", router)


export default app

