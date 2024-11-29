import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toLoginResponse,
  type LoginRequest,
  type LoginResponse,
} from "../model/user-model";
import { TokenUtils } from "../utils/token-utils";
import { AuthValidation } from "../validation/auth-validation";
import { Validation } from "../validation/validation";

export class AuthService {
  static async login(request: LoginRequest): Promise<LoginResponse> {
    const requestBody: LoginRequest = Validation.validate(
      AuthValidation.loginRequest,
      request
    );

    const user = await prisma.user.findUnique({
      where: {
        email: requestBody.email,
      },
    });

    if (!user) {
      throw new ErrorResponse(404, "email or password not match");
    }

    const isPasswordMatch = await Bun.password.verify(
      requestBody.password,
      user.password
    );

    if (!isPasswordMatch) {
      throw new ErrorResponse(404, "email or password not match");
    }

    const token = await TokenUtils.generateToken(user.id);

    return toLoginResponse(token);
  }
}
