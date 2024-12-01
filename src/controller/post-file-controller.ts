import type { NextFunction, Request, Response } from "express";
import { PostFileService } from "../service/post-file-service";

export class PostFileController {
  static async storePostFile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const postId: number = parseInt(req.params.postId);
      const requestFile: Express.Multer.File = req.file as Express.Multer.File;
      const result = await PostFileService.storePostFile(requestFile, postId);
      return res.status(200).json({
        statusCode: 200,
        message: "success store post_file",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updatePostFileByPostId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const postId: number = parseInt(req.params.postId);
      const requestFile: Express.Multer.File = req.file as Express.Multer.File;
      const result = await PostFileService.updatePostFileByPostId(
        requestFile,
        postId
      );
      return res.status(200).json({
        statusCode: 200,
        message: "success update post_file",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
