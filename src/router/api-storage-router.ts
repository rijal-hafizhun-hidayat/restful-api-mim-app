import express from "express";
import { PostFileController } from "../controller/post-file-controller";
import { uploadPostFile } from "../upload/post-upload";

const apiStorageRouter = express.Router();

apiStorageRouter.post(
  "/api/storage/post/:postId/post_file",
  uploadPostFile.single("file"),
  PostFileController.storePostFile
);

export { apiStorageRouter };
