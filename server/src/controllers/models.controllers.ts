import { Request, Response } from "express";
import { db } from "../config/db";
import { promisify } from "util";



export const modelControllers = async(req: Request, res: Response): Promise<void>  => {
    const uuidSql = "select uuid from models order by modelid desc";
    const urlSql = "select url from models order by modelid desc limit 1"

    try {
        const dbAll = promisify(db.all).bind(db);
        const dbGet = promisify(db.get).bind(db);
        
        const uuidRows = await dbAll(uuidSql);
        const url = await dbGet(urlSql)
        res.json({uuid: uuidRows, url: url? [url] : []})
    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error")
    }

    
}