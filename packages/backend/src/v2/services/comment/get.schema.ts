import ArticleModel from '@/model/article/article';
import CommentModel from '@/model/article/comment';
import { optionalConfigSchema } from '@/v2/dao/type';
import { Type } from '@sinclair/typebox';
import { Static } from '@sinclair/typebox';

export const CommentListSchema = {
  body: Type.Object({
    config: optionalConfigSchema,
    comment_id: Type.Optional(Type.String()),
    user_id: Type.Optional(Type.String()),
    article_id: Type.Optional(Type.String()),
  }),
};
export type CommentListRequestType = Static<typeof CommentListSchema.body>;
export const updateCommentSchema = {
  body: Type.Object({
    comment: Type.String(),
  }),
};
export const insertCommentSchema = {
  body: Type.Object({
    content: Type.String(),
    user_id: Type.Optional(Type.String()),
    article_id: Type.String(),
    comment_by: Type.Optional(Type.String()),
  }),
};

export const deleteCommentSchema = {
  body: Type.Object({
    comment_id: Type.Optional(Type.String()),
    user_id: Type.Optional(Type.String()),
    article_id: Type.Optional(Type.String()),
  }),
};
