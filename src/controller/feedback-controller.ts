import type { NextFunction, Request, Response } from "express";
import type { FeedbackRequest } from "../model/feedback-model";
import { FeedbackService } from "../service/feedback-service";

export class FeedbackController {
  static async getAllFeedback(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const query: Request["query"] = req.query;
      const result = await FeedbackService.getAllFeedback(query);
      return res.status(200).json({
        statusCode: 200,
        message: "success store feedback",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async storeFeedback(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: FeedbackRequest = req.body as FeedbackRequest;
      const result = await FeedbackService.storeFeedback(request);
      return res.status(200).json({
        statusCode: 200,
        message: "success store feedback",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
