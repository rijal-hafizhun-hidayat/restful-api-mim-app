import express from "express";
import { AuthController } from "../controller/admin/auth-controller";

const apiAdminRouter = express.Router();

apiAdminRouter.post("/api/admin/login", AuthController.login);

export { apiAdminRouter };
