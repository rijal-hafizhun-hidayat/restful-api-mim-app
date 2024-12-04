import express from "express";
import { MemeTypeController } from "../controller/meme-type-controller";
import { PostController } from "../controller/post-controller";
import { FeedbackController } from "../controller/feedback-controller";

const apiRouter = express.Router();

//start meme_type
apiRouter.get("/api/meme_type", MemeTypeController.getAllMemeType);
apiRouter.post("/api/meme_type", MemeTypeController.storeMemeType);
apiRouter.get(
  "/api/meme_type/:memeTypeId",
  MemeTypeController.findMemeTypeByMemeTypeId
);
apiRouter.delete(
  "/api/meme_type/:memeTypeId",
  MemeTypeController.destroyMemeTypeByMemeTypeId
);
apiRouter.put(
  "/api/meme_type/:memeTypeId",
  MemeTypeController.updateMemeTypeByMemeTypeId
);
//end meme_type

//start post
apiRouter.get("/api/post", PostController.getAllPost);
apiRouter.post("/api/post", PostController.storePost);
//end post

//start feedback
apiRouter.post("/api/feedback", FeedbackController.storeFeedback);
//end feedback

export { apiRouter };
