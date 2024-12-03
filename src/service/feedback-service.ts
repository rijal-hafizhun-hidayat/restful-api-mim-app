import { prisma } from "../app/database";
import {
  toFeedbackResponse,
  toSingleFeedbackResponse,
  type FeedbackRequest,
  type FeedbackResponse,
} from "../model/feedback-model";
import { FeedbackValidation } from "../validation/feedback-validation";
import { Validation } from "../validation/validation";

export class FeedbackService {
  static async getAllFeedback(): Promise<FeedbackResponse[]> {
    const feedbacks = await prisma.feedback.findMany({});
    return toFeedbackResponse(feedbacks);
  }

  static async storeFeedback(
    request: FeedbackRequest
  ): Promise<FeedbackResponse> {
    const requestBody: FeedbackRequest = Validation.validate(
      FeedbackValidation.feedbackRequest,
      request
    );

    const [storedFeedback] = await prisma.$transaction([
      prisma.feedback.create({
        data: {
          feedback: requestBody.feedback,
        },
      }),
    ]);

    return toSingleFeedbackResponse(storedFeedback);
  }
}
