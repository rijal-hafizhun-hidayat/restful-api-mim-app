import { string, z, type ZodType } from "zod";

export class RoleValidation {
  static readonly storeRole: ZodType = z.object({
    name: string().min(1).max(100),
  });
}
