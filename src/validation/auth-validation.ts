import { string, z, type ZodType } from "zod";

export class AuthValidation {
  static readonly loginRequest: ZodType = z.object({
    email: string().min(1).email(),
    password: string().min(1).max(100),
  });
}
