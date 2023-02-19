import { ArticleType } from '@/constants/enums';
import { Type } from '@sinclair/typebox';
import { ConfigSchema } from '../../dao/type';
export const articleSchema = {
  body: Type.Object({
    config: ConfigSchema,
    article_id: Type.String(),
    article_type: Type.Enum(ArticleType),
    title: Type.String(),
    user_id: Type.String(),
    created_at: Type.String(),
    updated_at: Type.String(),
  }),
};
export const deleteArticleSchema = {
  body: Type.Object({
    article_id: Type.String(),
  }),
};
export const insertArticleSchema = {
  body: Type.Object({
    content: Type.String(),
    user_id: Type.String(),
  }),
};
export const updateArticleSchema = {
  body: Type.Object({
    updatedBy: Type.Object({
      article_id: Type.String(),
    }),
    updated: Type.Object({
      article_type: Type.Enum(ArticleType),
      content: Type.String(),
      share_number: Type.Number(),
      title: Type.String(),
    }),
  }),
};
