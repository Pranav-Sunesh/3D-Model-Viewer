import { Router } from "express";
import { uploadController } from "../controllers/upload.controllers";
import { upload } from "../config/multer";

const router = Router();

router.post('/upload', upload.single('file'), uploadController);

export default router