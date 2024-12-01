import type { NextFunction, Request, Response } from "express";
import type { LoginRequest } from "../../model/user-model";
import { AuthService } from "../../service/auth-service";
import type { CostumeRequest } from "../../interface/request-interface";

export class AuthController {
  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: LoginRequest = req.body as LoginRequest;
      const result = await AuthService.login(request);
      return res.status(200).json({
        statusCode: 200,
        message: "success login",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async currentUser(
    req: CostumeRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      return res.status(200).json({
        statusCode: 200,
        message: "success get current user",
        data: req.currentUser,
      });
    } catch (error) {
      next(error);
    }
  }
}
