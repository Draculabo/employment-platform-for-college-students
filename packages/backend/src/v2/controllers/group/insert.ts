import { FastifyRequestTypebox, Response } from '@/types/Server';
import CommentInfoService from '@/v2/services/comment/comment';
import type { insertCommentSchema, CommentListRequestType, CommentListSchema } from '../../services/comment/get.schema';
import { Type } from '@sinclair/typebox';
import { successJSON } from '../internal/utils/response-json';
import { insertGroupSchema } from '@/v2/services/group/schema';
import GroupService from '@/v2/services/group/group';

export const insertGroup = async (req: FastifyRequestTypebox<typeof insertGroupSchema>): Promise<Response> => {
  await new GroupService(req.ids, req.DBTransaction, req.userUUID).insertGroup({ ...req.body });
  return successJSON({});
};
