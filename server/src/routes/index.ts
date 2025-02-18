import { Router } from "express";
import { uploadController } from "../controllers/upload.controllers";
import { upload } from "../config/multer";
import { modelControllers } from "../controllers/models.controllers";
import { modelIdControllers } from "../controllers/modelId.controllers";

const router = Router();

router.post('/upload', upload.single('file'), uploadController);
router.get('/models', modelControllers);
router.get('/models/:id', modelIdControllers);

export default router