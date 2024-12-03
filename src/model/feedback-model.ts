import type { feedback } from "@prisma/client";

export interface FeedbackRequest {
  feedback: string;
}

export interface FeedbackResponse {
  id: number;
  feedback: string;
  created_at: Date;
  updated_at: Date;
}

export function toSingleFeedbackResponse(feedback: feedback): FeedbackResponse {
  return {
    id: feedback.id,
    feedback: feedback.feedback,
    created_at: feedback.created_at,
    updated_at: feedback.updated_at,
  };
}

export function toFeedbackResponse(feedbacks: feedback[]): FeedbackResponse[] {
  return feedbacks.map((feedback) => ({
    id: feedback.id,
    feedback: feedback.feedback,
    created_at: feedback.created_at,
    updated_at: feedback.updated_at,
  }));
}
