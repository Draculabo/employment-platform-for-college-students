import { FastifyRequestTypebox, Response } from '@/types/Server';
import CommentInfoService from '@/v2/services/comment/info';
import type { CommentListRequestType, CommentListSchema } from '../../services/comment/get.schema';
import { Type } from '@sinclair/typebox';
import { successJSON } from '../internal/utils/response-json';

export const commentList = async (req: FastifyRequestTypebox<typeof CommentListSchema>): Promise<Response> => {
  const result = await new CommentInfoService(req.ids, req.DBTransaction, req.userUUID).commentList(req.body);
  return successJSON({
    list: result,
  });
};
