import Jwt from "jsonwebtoken";

export class TokenUtils {
  static async generateToken(userId: number) {
    const token = Jwt.sign(
      {
        userId: userId,
      },
      process.env.JWT_KEY as string,
      { expiresIn: "1h" }
    );

    return token;
  }

  static async verifyToken(token: string) {
    const jwtKey = Bun.env.JWT_KEY as string;
    if (!jwtKey) {
      throw new Error("JWT_KEY is not defined in the environment variables.");
    }

    const blacklist = new Set<string>();

    if (blacklist.has(token)) {
      throw new Error("token is revoked");
    }

    return Jwt.verify(token, jwtKey as string);
  }
}
