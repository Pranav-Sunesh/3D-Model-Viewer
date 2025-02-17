import { Request, Response } from "express";
import db from "../config/db";

export const modelIdControllers = async(req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    const sql = "select url from models where uuid = ?";
    const sqlValues = [id];
    const promiseDB = db.promise();

    const [rows, fields] = await promiseDB.execute(sql, sqlValues);

    res.json({url: rows});
    
}