import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";
import unzipper from "unzipper";
import { findGLTFFile } from "../services/findGLTF";
import db from "../config/db";

const insertModelToDB = (uuid: string, filename: string, res: Response) => {
  const url = `http://localhost:5000/models/${uuid}/${filename}`;
  const SQL = "INSERT INTO models (uuid, url) VALUES (?, ?)";

  db.query(SQL, [uuid, url], (err) => {
    if (err) {
      console.error("Error while inserting data:", err);
      return res.status(500).json({ error: "Database error" });
    }
    console.log("Data inserted successfully");
    res.json({ message: "File uploaded successfully", url });
  });
};

export const uploadController = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded." });

    const filePath = req.file.path;
    const fileExt = path.extname(req.file.originalname).toLowerCase();
    const uuid = path.basename(filePath, fileExt);
    const targetDir = path.join(__dirname, "../../models", uuid);

    // Create target directory if not exists
    await fsPromises.mkdir(targetDir, { recursive: true });

    if (fileExt === ".glb") {
      // Move GLB file
      const newFilePath = path.join(targetDir, req.file.originalname);
      await fsPromises.rename(filePath, newFilePath);
      return insertModelToDB(uuid, req.file.originalname, res);
    }

    if (fileExt === ".zip") {
      // Extract ZIP file
      await new Promise<void>((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(unzipper.Extract({ path: targetDir }))
          .on("close", resolve)
          .on("error", reject);
      });

      await fsPromises.unlink(filePath); // Remove ZIP after extraction

      const targetFile = findGLTFFile(targetDir);
      if (!targetFile) {
        return res.status(400).json({ error: "No GLTF file found in ZIP." });
      }

      return insertModelToDB(uuid, targetFile, res);
    }

    res.status(400).json({ error: "Invalid file type. Only GLB and ZIP allowed." });
  } catch (error) {
    console.error("Error in uploadController:", error);
    res.status(500).json({ error: "Server error" });
  }
};
