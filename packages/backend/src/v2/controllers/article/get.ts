import { FastifyRequestTypebox, Response } from '@/types/Server';
import CommentInfoService from '@/v2/services/comment/info';
import type { CommentListRequestType, CommentListSchema } from '../../services/comment/get.schema';
import { Type } from '@sinclair/typebox';
import { successJSON } from '../internal/utils/response-json';
import { articleSchema } from '@/v2/services/article/get.schema';
import ArticleService from '@/v2/services/article/article';

export const articleList = async (req: FastifyRequestTypebox<typeof articleSchema>): Promise<Response> => {
  const result = await new ArticleService(req.ids, req.DBTransaction, req.userUUID).getArticleList(req.body);
  return successJSON({
    list: result,
  });
};
