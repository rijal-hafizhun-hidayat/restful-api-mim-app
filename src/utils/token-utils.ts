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
}
