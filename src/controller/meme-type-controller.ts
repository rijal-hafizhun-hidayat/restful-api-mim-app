import type { NextFunction, Request, Response } from "express";
import { MemeTypeService } from "../service/meme-type-service";
import type { MemeType } from "../model/meme-type-model";

export class MemeTypeController {
  static async getAllMemeType(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const results = await MemeTypeService.getAllMemeType();
      return res.status(200).json({
        statusCode: 200,
        message: "success get meme_type",
        data: results,
      });
    } catch (error) {
      next(error);
    }
  }

  static async storeMemeType(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: MemeType = req.body as MemeType;
      const result = await MemeTypeService.storeMemeType(request);
      return res.status(200).json({
        statusCode: 200,
        message: "success store meme_type",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findMemeTypeByMemeTypeId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const memeTypeId: number = parseInt(req.params.memeTypeId);
      const result = await MemeTypeService.findMemeTypeByMemeTypeId(memeTypeId);
      return res.status(200).json({
        statusCode: 200,
        message: "success find meme_type",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateMemeTypeByMemeTypeId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const memeTypeId: number = parseInt(req.params.memeTypeId);
      const request: MemeType = req.body as MemeType;
      const result = await MemeTypeService.updateMemeTypeByMemeTypeId(
        request,
        memeTypeId
      );
      return res.status(200).json({
        statusCode: 200,
        message: "success update meme_type",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async destroyStoreMemeTypeByMemeTypeId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const memeTypeId: number = parseInt(req.params.memeTypeId);
      const result = await MemeTypeService.destroyMemeTypeByMemeTypeId(
        memeTypeId
      );
      return res.status(200).json({
        statusCode: 200,
        message: "success destroy meme_type",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
