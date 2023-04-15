import { ArticleType } from '@/constants/enums';
import { Type } from '@sinclair/typebox';
import { ConfigSchema } from '../../dao/type';
export const articleSchema = {
  body: Type.Object({
    config: Type.Optional(ConfigSchema),
    article_id: Type.Optional(Type.String()),
    article_type: Type.Optional(Type.Enum(ArticleType)),
    title: Type.Optional(Type.String()),
    user_id: Type.Optional(Type.String()),
    keyword: Type.Optional(Type.String()),
  }),
};
export const deleteArticleSchema = {
  body: Type.Object({
    article_id: Type.String(),
  }),
};
export const insertArticleSchema = {
  body: Type.Object({
    title: Type.String(),
    content: Type.String(),
    article_type: Type.Optional(Type.Enum(ArticleType)),
    user_id: Type.Optional(Type.String()),
  }),
};
export const updateArticleSchema = {
  body: Type.Object({
    updatedBy: Type.Object({
      article_id: Type.String(),
    }),
    updated: Type.Object({
      article_type: Type.Optional(Type.Enum(ArticleType)),
      content: Type.Optional(Type.String()),
      share_number: Type.Optional(Type.Number()),
      title: Type.Optional(Type.String()),
    }),
  }),
};
