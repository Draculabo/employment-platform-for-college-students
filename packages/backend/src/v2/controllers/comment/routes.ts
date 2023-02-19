import { Server } from '@/utils/RegisterRouter';
import { commentList } from './get';
import { CommentListSchema, deleteCommentSchema, insertCommentSchema } from '@/v2/services/comment/get.schema';
import { insertComment } from './insert';
import { deleteComment } from './delete';

export const CommentRoutes = (server: Server) => {
  server.post('comment/list', commentList, {
    schema: CommentListSchema,
  });
  server.post('comment/add', insertComment, {
    schema: insertCommentSchema,
  });
  server.post('comment/delete', deleteComment, {
    schema: deleteCommentSchema,
  });
};
