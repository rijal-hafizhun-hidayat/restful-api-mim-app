import type { NextFunction, Request, Response } from "express";
import { RoleService } from "../service/role-service";
import type { RoleRequest } from "../model/role-model";

export class RoleController {
  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await RoleService.getAll();
      return res.status(200).json({
        statusCode: 200,
        message: "success get role",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async storeRole(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: RoleRequest = req.body as RoleRequest;
      const result = await RoleService.storeRole(request);
      return res.status(200).json({
        statusCode: 200,
        message: "success store role",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async destroyRoleByRoleId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const roleId: number = parseInt(req.params.roleId);
      const result = await RoleService.destroyRoleByRoleId(roleId);
      return res.status(200).json({
        statusCode: 200,
        message: "success destroy role",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findRoleByRoleId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const roleId: number = parseInt(req.params.roleId);
      const result = await RoleService.findRoleByRoleId(roleId);
      return res.status(200).json({
        statusCode: 200,
        message: "success get role",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateRoleByRoleId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const roleId: number = parseInt(req.params.roleId);
      const request: RoleRequest = req.body as RoleRequest;
      const result = await RoleService.updateRoleByRoleId(request, roleId);
      return res.status(200).json({
        statusCode: 200,
        message: "success update role",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
