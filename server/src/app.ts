import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import path from "path";
import { db } from "./config/db";

const app: Application = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/models',express.static(path.join(__dirname, '../models')) )
console.log(__dirname);


//Routes
app.use("/", router)


export default app

