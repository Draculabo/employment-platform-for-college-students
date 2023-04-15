import { IPublishComment, IPublishCommentReply } from '@/types/type';
import { post } from '../../config';
import { PaginationParams, ResponseData, resolve } from '../../type';
import { UserBaseInfo } from '../user';
import { IComment } from './type';
export interface CommentListRequest {
  config?: PaginationParams;
  user_id?: string;
  article_id?: string;
}
export interface CommentListResponse {
  list: IComment[];
}

export interface InsertCommentRequest {
  user_id?: string;
  comment_by?: string;
  content: string;
  article_id: string;
}
export interface RemoveCommentRequest {
  comment_id?: string;
  user_id?: string;
  article_id?: string;
}
export function publishComment(data: InsertCommentRequest) {
  return resolve(post<ResponseData<{}>>('/comment/add', data));
}

// export function publishCommentReply(data: IPublishCommentReply) {
//   return post('/comment/insert', data);
// }
export function removeComment(data: RemoveCommentRequest) {
  return resolve(post<ResponseData<{}>>('/comment/delete', data));
}

export function queryCommunityArticleCommentsById(data: CommentListRequest) {
  return resolve(post<ResponseData<CommentListResponse>>('/comment/list', data));
}

export function queryCommentPosition(data: { commentId: number; pageSize: number; articleId: number }) {
  return post('/communityComment/queryCommentPosition', data);
}
