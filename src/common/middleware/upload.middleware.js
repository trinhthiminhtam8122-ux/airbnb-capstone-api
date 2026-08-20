import multer from "multer";
import path from "node:path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/");
    },

    filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname); 
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "local" + "-" + uniqueSuffix + fileExt); 
  },
})

export const uploadDiskStorage = multer({ storage: storage });