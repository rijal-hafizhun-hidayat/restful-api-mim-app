import type { NextFunction, Response } from "express";
import { TokenUtils } from "../utils/token-utils";
import { prisma } from "../app/database";
import type { CostumeRequest } from "../interface/request-interface";

export const authMiddleware = async (
  req: CostumeRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(403)
      .json({
        statusCode: 403,
        message: "no token provided",
      })
      .end();
  }

  const [, tokenValue] = token.split(" ");

  try {
    const decode = await TokenUtils.verifyToken(tokenValue);
    const userId: number = (decode as any).userId;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        user_role: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      return res
        .status(403)
        .json({
          statusCode: 403,
          errors: "token invalid",
        })
        .end();
    }

    const formatUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.user_role?.role,
    };

    req.currentUser = formatUser;
    return next();
  } catch (error: any) {
    let errorMessage = "Token invalid";
    if (error.name === "TokenExpiredError") {
      errorMessage = "Token expired";
    } else if (error.name === "JsonWebTokenError") {
      errorMessage = "Token malformed";
    }

    return res
      .status(403)
      .json({
        statusCode: 403,
        errors: errorMessage,
      })
      .end();
  }
};
