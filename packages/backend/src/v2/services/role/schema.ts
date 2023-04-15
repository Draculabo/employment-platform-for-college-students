import { Status } from '@/constants/Project';
import { GroupStatus, RecommendLevel } from '@/constants/enums';
import { ConfigSchema } from '@/v2/dao/type';
import { Type } from '@sinclair/typebox';

export const insertRoleSchema = {
  body: Type.Object({
    name: Type.String(),
    remark: Type.Optional(Type.String()),
  }),
};
export const updateRoleSchema = {
  body: Type.Object({
    updated: Type.Object({
      remark: Type.Optional(Type.String()),
      name: Type.Optional(Type.String()),
      status: Type.Optional(Type.Enum(Status)),
    }),
    updatedBy: Type.Object({
      role_id: Type.String(),
    }),
  }),
};
export const deleteRoleSchema = {
  body: Type.Object({
    role_id: Type.String(),
  }),
};
export const roleListSchema = {
  body: Type.Optional(
    Type.Object(
      {
        role_id: Type.Optional(Type.String()),
        name: Type.Optional(Type.String()),
        status: Type.Optional(Type.Enum(Status)),
        remark: Type.Optional(Type.String()),
      },
      {
        additionalProperties: true,
      }
    )
  ),
};
