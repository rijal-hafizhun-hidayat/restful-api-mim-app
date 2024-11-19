import express from "express";
import { MemeTypeController } from "../controller/meme-type-controller";

const apiRoute = express.Router();

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

export { apiRoute };
