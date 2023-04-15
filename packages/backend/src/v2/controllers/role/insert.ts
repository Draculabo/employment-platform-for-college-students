import { FastifyRequestTypebox, Response } from '@/types/Server';
import CommentInfoService from '@/v2/services/comment/comment';
import type { CommentListRequestType, CommentListSchema } from '../../services/comment/get.schema';
import { Type } from '@sinclair/typebox';
import { successJSON } from '../internal/utils/response-json';
import { groupListSchema } from '@/v2/services/group/schema';
import GroupService from '@/v2/services/group/group';
import { insertRoleSchema, roleListSchema } from '@/v2/services/role/schema';
import RoleService from '@/v2/services/role/role';

export const insertRole = async (req: FastifyRequestTypebox<typeof insertRoleSchema>) => {
  await new RoleService(req.ids, req.DBTransaction, req.userUUID).insertRole(req.body);
  return successJSON({});
};
