import express from "express";

const apiStaticStorageFileRouter = express.Router();

apiStaticStorageFileRouter.use(
  "/api/storage-file/post",
  express.static("src/storage/post")
);

export { apiStaticStorageFileRouter };
