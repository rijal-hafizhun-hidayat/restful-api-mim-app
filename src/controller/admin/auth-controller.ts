import type { NextFunction, Request, Response } from "express";
import type { LoginRequest } from "../../model/user-model";
import { AuthService } from "../../service/auth-service";

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
    } catch (error) {}
  }
}
