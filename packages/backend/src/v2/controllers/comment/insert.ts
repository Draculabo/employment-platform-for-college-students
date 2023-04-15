import { FastifyRequestTypebox, Response } from '@/types/Server';
import CommentInfoService from '@/v2/services/comment/comment';
import type { insertCommentSchema, CommentListRequestType, CommentListSchema } from '../../services/comment/get.schema';
import { Type } from '@sinclair/typebox';
import { failJSON, successJSON } from '../internal/utils/response-json';

export const insertComment = async (req: FastifyRequestTypebox<typeof insertCommentSchema>): Promise<Response> => {
  try {
    await new CommentInfoService(req.ids, req.DBTransaction, req.userUUID).insertComment({ ...req.body });
    return successJSON({});
  } catch (error) {
    const err = error as unknown as Error;
    return failJSON({
      msg: err.message,
    });
  }
};
