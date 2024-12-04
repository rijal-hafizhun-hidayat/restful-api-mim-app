import { string, z, type ZodType } from "zod";

export class FeedbackValidation {
  static readonly feedbackRequest: ZodType = z.object({
    feedback: string().min(1),
  });
}
