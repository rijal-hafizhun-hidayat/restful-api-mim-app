import express from "express";
import { AuthController } from "../controller/admin/auth-controller";
import { authMiddleware } from "../middleware/auth-middleware";

const apiAdminRouter = express.Router();

apiAdminRouter.post("/api/admin/login", AuthController.login);

apiAdminRouter.use(authMiddleware);

export { apiAdminRouter };
