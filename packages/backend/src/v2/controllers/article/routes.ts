import { Server } from '@/utils/RegisterRouter';
import { articleList } from './get';
import { articleSchema, deleteArticleSchema, insertArticleSchema } from '@/v2/services/article/get.schema';
import { insertArticle } from './insert';
import { deleteArticle } from './delete';

export const articleRoutes = (server: Server) => {
  server.post('article/list', articleList, {
    schema: articleSchema,
  });
  server.post('article/add', insertArticle, {
    schema: insertArticleSchema,
  });
  server.post('article/delete', deleteArticle, {
    schema: deleteArticleSchema,
  });
};
