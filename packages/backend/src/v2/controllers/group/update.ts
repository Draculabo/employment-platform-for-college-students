import { FastifyRequestTypebox, Response } from '@/types/Server';
import CommentInfoService from '@/v2/services/comment/comment';
import type { insertCommentSchema, CommentListRequestType, CommentListSchema } from '../../services/comment/get.schema';
import { Type } from '@sinclair/typebox';
import { successJSON } from '../internal/utils/response-json';
import { insertGroupSchema, joinGroupSchema, updateGroupSchema } from '@/v2/services/group/schema';
import GroupService from '@/v2/services/group/group';

export const updateGroup = async (req: FastifyRequestTypebox<typeof updateGroupSchema>): Promise<Response> => {
  const result = await new GroupService(req.ids, req.DBTransaction, req.userUUID).updateGroup({
    ...req.body,
  });
  return successJSON({});
};
export const joinGroup = async (req: FastifyRequestTypebox<typeof joinGroupSchema>): Promise<Response> => {
  await new GroupService(req.ids, req.DBTransaction, req.userUUID).joinGroup({
    group_id: req.body.group_id,
    users: req.body.users ?? [req.userUUID],
  });
  return successJSON({});
};
