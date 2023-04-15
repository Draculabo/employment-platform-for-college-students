import { FastifyRequestTypebox, Response } from '@/types/Server';
import CommentInfoService from '@/v2/services/comment/comment';
import type { CommentListRequestType, CommentListSchema } from '../../services/comment/get.schema';
import { Type } from '@sinclair/typebox';
import { successJSON } from '../internal/utils/response-json';
import { groupListSchema } from '@/v2/services/group/schema';
import GroupService from '@/v2/services/group/group';
import { roleListSchema } from '@/v2/services/role/schema';
import RoleService from '@/v2/services/role/role';

export const roleList = async (req: FastifyRequestTypebox<typeof roleListSchema>): Promise<Response> => {
  debugger;
  const result = await new RoleService(req.ids, req.DBTransaction, req.userUUID).roleList(req.body);
  return successJSON({
    list: result,
  });
};
