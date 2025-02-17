import { Request, Response } from "express";
import db from "../config/db";


export const modelControllers = async(req: Request, res: Response): Promise<void>  => {
    const uuidSql = "select uuid from models order by modelid desc";
    const ulrSql = "select url from models order by modelid desc limit 1"

    try {
        const promiseDB = db.promise()
        const [uuidRows, fields] = await promiseDB.execute(uuidSql);
        const [url, fields1] = await promiseDB.execute(ulrSql);
        res.json({uuid: uuidRows, url: url})
    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error")
    }

    
}