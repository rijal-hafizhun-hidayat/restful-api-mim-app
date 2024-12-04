import type { role } from "@prisma/client";

export interface RoleResponse {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface RoleRequest {
  name: string;
}

export function toRoleResponse(roles: role[]): RoleResponse[] {
  return roles.map((role) => ({
    id: role.id,
    name: role.name,
    created_at: role.created_at,
    updated_at: role.updated_at,
  }));
}

export function toSingleRoleResponse(role: role): RoleResponse {
  return {
    id: role.id,
    name: role.name,
    created_at: role.created_at,
    updated_at: role.updated_at,
  };
}
