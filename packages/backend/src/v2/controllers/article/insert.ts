import { FastifyRequestTypebox, Response } from '@/types/Server';
import CommentInfoService from '@/v2/services/comment/info';
import type { CommentListRequestType, CommentListSchema } from '../../services/comment/get.schema';
import { Type } from '@sinclair/typebox';
import { successJSON } from '../internal/utils/response-json';
import { articleSchema, deleteArticleSchema, insertArticleSchema } from '@/v2/services/article/get.schema';
import ArticleService from '@/v2/services/article/article';

export const insertArticle = async (req: FastifyRequestTypebox<typeof insertArticleSchema>): Promise<Response> => {
  const result = await new ArticleService(req.ids, req.DBTransaction, req.userUUID).insertComment(req.body);
  return successJSON({});
};
