import { FastifyRequestTypebox, Response } from '@/types/Server';
import CommentInfoService from '@/v2/services/comment/comment';
import type {
  insertCommentSchema,
  CommentListRequestType,
  CommentListSchema,
  deleteCommentSchema,
} from '../../services/comment/get.schema';
import { Type } from '@sinclair/typebox';
import { successJSON } from '../internal/utils/response-json';

export const deleteComment = async (req: FastifyRequestTypebox<typeof deleteCommentSchema>): Promise<Response> => {
  const result = await new CommentInfoService(req.ids, req.DBTransaction, req.userUUID).deleteComment({ ...req.body });
  return successJSON({});
};
