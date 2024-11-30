import { string, z, type ZodType } from "zod";

export class MemeTypeValidation {
  static readonly memeTypeRequest: ZodType = z.object({
    name: string().min(1).max(100),
    background_color: string().min(1).max(50),
    text_color: string().min(1).max(50),
  });
}
