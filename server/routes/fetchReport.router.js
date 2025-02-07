import { Router } from "express";
import upload from "../middleware/multer.js"; // Ensure correct filename
import { uploadController } from "../controllers/upload.controller.js"; 
import { getReportsController } from "../controllers/getReport.controller.js"; 

const router = Router();


router.post("/upload", upload.single("file"), uploadController);
router.get("/reports", getReportsController);

export default router;
