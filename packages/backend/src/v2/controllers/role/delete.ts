import { FastifyRequestTypebox, Response } from '@/types/Server';
import CommentInfoService from '@/v2/services/comment/comment';
import type { CommentListRequestType, CommentListSchema } from '../../services/comment/get.schema';
import { Type } from '@sinclair/typebox';
import { successJSON } from '../internal/utils/response-json';
import { groupListSchema } from '@/v2/services/group/schema';
import GroupService from '@/v2/services/group/group';
import { deleteRoleSchema, insertRoleSchema, roleListSchema, updateRoleSchema } from '@/v2/services/role/schema';
import RoleService from '@/v2/services/role/role';

export const deleteRole = async (req: FastifyRequestTypebox<typeof deleteRoleSchema>) => {
  await new RoleService(req.ids, req.DBTransaction, req.userUUID).deleteRole(req.body);
  return successJSON({});
};
