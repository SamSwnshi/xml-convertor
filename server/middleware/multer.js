import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    
    const fileExt = path.extname(file.originalname);
    const safeFilename = `${Date.now()}${fileExt}`;
    cb(null, safeFilename);
  }
});


const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/xml" || file.mimetype === "text/xml") {
    cb(null, true);
  } else {
    cb(new Error(" Invalid file type. Only XML files are allowed."), false);
  }
};


const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

export default upload;
