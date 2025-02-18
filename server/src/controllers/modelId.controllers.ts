import { Request, Response } from "express";
import { db } from "../config/db";
import { promisify } from "util";

interface RowType{
    url: string
}

export const modelIdControllers = async(req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    const sql = "select url from models where uuid = ?";
    
    try {
        db.get(sql, [id], (err, row: RowType) => {
            if(err){
                console.log(err);
                return res.json(500).json("Server Error");
            }
            res.json({url: row? row.url : null})
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error");
    }
    
}