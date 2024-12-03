import express from "express";
import { AuthController } from "../controller/admin/auth-controller";
import { authMiddleware } from "../middleware/auth-middleware";
import { MemeTypeController } from "../controller/meme-type-controller";
import { RoleController } from "../controller/role-controller";
import { AdminPostController } from "../controller/admin/admin-post-controller";

const apiAdminRouter = express.Router();

apiAdminRouter.post("/api/admin/login", AuthController.login);

apiAdminRouter.use(authMiddleware);
apiAdminRouter.get("/api/admin/current_user", AuthController.currentUser);
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

apiAdminRouter.get("/api/admin/post", AdminPostController.getAllPost);
apiAdminRouter.post("/api/admin/post", AdminPostController.storePost);
apiAdminRouter.get(
  "/api/admin/post/:postId",
  AdminPostController.findPostByPostId
);
apiAdminRouter.put(
  "/api/admin/post/:postId",
  AdminPostController.updatePostByPostId
);
apiAdminRouter.delete(
  "/api/admin/post/:postId",
  AdminPostController.destroyPostByPostId
);

apiAdminRouter.get("/api/admin/role", RoleController.getAll);
apiAdminRouter.post("/api/admin/role", RoleController.storeRole);
apiAdminRouter.get("/api/admin/role/:roleId", RoleController.findRoleByRoleId);
apiAdminRouter.delete(
  "/api/admin/role/:roleId",
  RoleController.destroyRoleByRoleId
);
apiAdminRouter.put(
  "/api/admin/role/:roleId",
  RoleController.updateRoleByRoleId
);

export { apiAdminRouter };
