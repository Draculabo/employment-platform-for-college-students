import { GroupStatus, RecommendLevel } from '@/constants/enums';
import { ConfigSchema } from '@/v2/dao/type';
import { Type } from '@sinclair/typebox';

export const insertGroupSchema = {
  body: Type.Object({
    name: Type.String(),
    introduction: Type.String(),
    status: Type.Enum(GroupStatus),
    count: Type.Number(),
    top_level: Type.Enum(RecommendLevel),
  }),
};
export const updateGroupSchema = {
  body: Type.Object({
    updated: Type.Object({
      ...insertGroupSchema.body.properties,
      transfer_id: Type.String(),
    }),
    updatedBy: Type.Object({
      group_id: Type.String(),
    }),
  }),
};
export const deleteGroupSchema = {
  body: Type.Object({
    group_id: Type.String(),
  }),
};
export const joinGroupSchema = {
  body: Type.Object({
    users: Type.Optional(Type.Array(Type.String())),
    group_id: Type.String(),
  }),
};
export const groupListSchema = {
  body: Type.Optional(
    Type.Object(
      {
        config: Type.Optional(ConfigSchema),
        id: Type.Optional(Type.Number()),
        status: Type.Optional(Type.Enum(GroupStatus)),
        user_id: Type.Optional(Type.Number()),
        top_level: Type.Optional(Type.Enum(RecommendLevel)),
      },
      {
        additionalProperties: true,
      }
    )
  ),
};
