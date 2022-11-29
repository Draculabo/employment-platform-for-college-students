import { post } from "../config";

export function publishComment(data: IPublishComment) {
  return post('/communityComment/publish', data);
}

export function publishCommentReply(data: IPublishCommentReply) {
  return post('/communityComment/reply', data);
}

export function removeComment(data: { commentId: number, articleId: number, level: number }) {
  return post('/communityComment/remove', data);
}

export function queryCommunityArticleCommentsById(data: { articleId: number, pageSize: number, pageNum: number }) {
  return post('/communityComment/queryCommentsByArticleId', data);
}