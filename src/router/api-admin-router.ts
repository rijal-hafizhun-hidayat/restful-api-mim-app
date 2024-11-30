import express from "express";
import { AuthController } from "../controller/admin/auth-controller";
import { authMiddleware } from "../middleware/auth-middleware";
import { MemeTypeController } from "../controller/meme-type-controller";

const apiAdminRouter = express.Router();

apiAdminRouter.post("/api/admin/login", AuthController.login);

apiAdminRouter.use(authMiddleware);
apiAdminRouter.get("/api/admin/meme_type", MemeTypeController.getAllMemeType);
apiAdminRouter.post("/api/admin/meme_type", MemeTypeController.storeMemeType);
apiAdminRouter.get(
  "/api/admin/meme_type/:memeTypeId",
  MemeTypeController.findMemeTypeByMemeTypeId
);
apiAdminRouter.put(
  "/api/admin/meme_type/:memeTypeId",
  MemeTypeController.updateMemeTypeByMemeTypeId
);
apiAdminRouter.delete(
  "/api/admin/meme_type/:memeTypeId",
  MemeTypeController.destroyMemeTypeByMemeTypeId
);

export { apiAdminRouter };
