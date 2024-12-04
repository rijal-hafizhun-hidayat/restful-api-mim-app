import multer from "multer";
import path from "path";
import fs from "fs";

const uploadPostDir = path.join("src", "storage", "post");

if (!fs.existsSync(uploadPostDir)) {
  fs.mkdirSync(uploadPostDir, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPostDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadPostFile = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (
      ext !== ".mp4" &&
      ext !== ".mkv" &&
      ext !== ".png" &&
      ext !== ".jpg" &&
      ext !== ".jpeg"
    ) {
      return cb(new Error("type file must mp4, mkv, png, jpg or jpeg"));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

export { uploadPostFile };
