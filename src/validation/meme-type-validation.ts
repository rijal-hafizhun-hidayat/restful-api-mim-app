import { string, z, type ZodType } from "zod";

export class MemeTypeValidation {
  static readonly memeTypeRequest: ZodType = z.object({
    name: string().min(1).max(100),
  });
}
