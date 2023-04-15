import { Server } from '@/utils/RegisterRouter';
import { articleList, getArticleById, getArticleType } from './get';
import { articleSchema, deleteArticleSchema, insertArticleSchema, updateArticleSchema } from '@/v2/services/article/get.schema';
import { insertArticle } from './insert';
import { deleteArticle } from './delete';
import { updateArticle } from './update';

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
  server.post('article/detail', getArticleById, {
    schema: articleSchema,
  });
  server.post('article/update', updateArticle, {
    schema: updateArticleSchema,
  });
  server.get('article/type', getArticleType, {
    schema: {},
  });
};
