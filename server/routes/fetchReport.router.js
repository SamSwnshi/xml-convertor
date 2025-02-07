import { Router } from "express";
import upload from "../middleware/multer.js"; // Ensure correct filename
import { uploadController } from "../controllers/upload.controller.js"; // Ensure correct folder name

const router = Router();

// ✅ Upload XML File Route
router.post("/upload", upload.single("file"), uploadController);

export default router;
