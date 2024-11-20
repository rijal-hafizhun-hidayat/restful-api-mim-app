import { z, type ZodType } from "zod";

export class PostValidation {
  static readonly postWithMemeTypesRequest: ZodType = z.object({
    id: z.number().int(),
    name: z.string().min(1),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
  });

  static readonly postRequest: ZodType = z.object({
    name: z.string().min(1).max(100),
    content: z.string().min(1).max(100),
    meme_types: z.array(PostValidation.postWithMemeTypesRequest).min(1),
  });
}
