import type { NextFunction, Request, Response } from "express";
import type { PostWithMemeTypesRequest } from "../model/post-model";
import { PostService } from "../service/post-service";

export class PostController {
  static async storePost(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: PostWithMemeTypesRequest =
        req.body as PostWithMemeTypesRequest;
      const result = await PostService.storePost(request);
      return res.status(200).json({
        statusCode: 200,
        message: "success store post",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllPost(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await PostService.getAllPost();
      return res.status(200).json({
        statusCode: 200,
        message: "success get post",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
