import express from "express";
import { MemeTypeController } from "../controller/meme-type-controller";
import { PostController } from "../controller/post-controller";
import { uploadPostFile } from "../upload/post-upload";

const apiRoute = express.Router();

//start meme_type
apiRoute.get("/api/meme_type", MemeTypeController.getAllMemeType);
apiRoute.post("/api/meme_type", MemeTypeController.storeMemeType);
apiRoute.get(
  "/api/meme_type/:memeTypeId",
  MemeTypeController.findMemeTypeByMemeTypeId
);
apiRoute.delete(
  "/api/meme_type/:memeTypeId",
  MemeTypeController.destroyStoreMemeTypeByMemeTypeId
);
apiRoute.put(
  "/api/meme_type/:memeTypeId",
  MemeTypeController.updateMemeTypeByMemeTypeId
);
//end meme_type

//start post
apiRoute.post("/api/post", PostController.storePost);

export { apiRoute };
