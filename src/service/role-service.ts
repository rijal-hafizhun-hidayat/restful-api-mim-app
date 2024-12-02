import { prisma } from "../app/database";
import { ErrorResponse } from "../error/error-response";
import {
  toRoleResponse,
  toSingleRoleResponse,
  type RoleRequest,
  type RoleResponse,
} from "../model/role-model";
import { RoleValidation } from "../validation/role-validation";
import { Validation } from "../validation/validation";

export class RoleService {
  static async getAll(): Promise<RoleResponse[]> {
    const roles = await prisma.role.findMany();
    return toRoleResponse(roles);
  }

  static async storeRole(request: RoleRequest): Promise<RoleResponse> {
    const requestBody: RoleRequest = Validation.validate(
      RoleValidation.storeRole,
      request
    );

    const isRoleExist = await prisma.role.findFirst({
      where: {
        name: requestBody.name,
      },
    });

    if (isRoleExist) {
      throw new ErrorResponse(404, "role already exist");
    }

    const [storedRole] = await prisma.$transaction([
      prisma.role.create({
        data: {
          name: requestBody.name,
        },
      }),
    ]);

    return toSingleRoleResponse(storedRole);
  }

  static async destroyRoleByRoleId(roleId: number): Promise<RoleResponse> {
    const isRoleExist = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });

    if (!isRoleExist) {
      throw new ErrorResponse(404, "role not found");
    }

    const [destroyedRole] = await prisma.$transaction([
      prisma.role.delete({
        where: {
          id: roleId,
        },
      }),
    ]);

    return toSingleRoleResponse(destroyedRole);
  }

  static async findRoleByRoleId(roleId: number): Promise<RoleResponse> {
    const role = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });

    if (!role) {
      throw new ErrorResponse(404, "role not found");
    }

    return toSingleRoleResponse(role);
  }

  static async updateRoleByRoleId(
    request: RoleRequest,
    roleId: number
  ): Promise<RoleResponse> {
    const requestBody: RoleRequest = Validation.validate(
      RoleValidation.storeRole,
      request
    );

    const isRoleExist = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });

    if (!isRoleExist) {
      throw new ErrorResponse(404, "role not found");
    }

    const [updatedRole] = await prisma.$transaction([
      prisma.role.update({
        where: {
          id: roleId,
        },
        data: {
          name: requestBody.name,
        },
      }),
    ]);

    return toSingleRoleResponse(updatedRole);
  }
}
