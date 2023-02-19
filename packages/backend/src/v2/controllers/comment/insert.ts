import { FastifyRequestTypebox, Response } from '@/types/Server';
import CommentInfoService from '@/v2/services/comment/info';
import type { insertCommentSchema, CommentListRequestType, CommentListSchema } from '../../services/comment/get.schema';
import { Type } from '@sinclair/typebox';
import { successJSON } from '../internal/utils/response-json';

export const insertComment = async (req: FastifyRequestTypebox<typeof insertCommentSchema>): Promise<Response> => {
  const result = await new CommentInfoService(req.ids, req.DBTransaction, req.userUUID).insertComment({ ...req.body });
  return successJSON({});
};
