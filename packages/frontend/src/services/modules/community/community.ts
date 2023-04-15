import { ICommunityArticle, ICommunityArticleUpdate, ICommunityCondition, ICommunityLike } from '@/types/type';
import { post } from '../../config';
import { ResponseData, resolve } from '../../type';
import { CommunityListRequest, CommunityListResponse, IArticle } from './type';

export function publishCommunity(data: ICommunityArticle) {
  return post<ResponseData<{}>>('/article/add', data);
}

export function updateCommunity(data: ICommunityArticleUpdate) {
  return post('/community/update', data);
}

export function removeCommunity(data: { article_id: string }) {
  return resolve(post<ResponseData<{}>>('/article/delete', data));
}

export function queryCommunity(data: CommunityListRequest) {
  return resolve(post<ResponseData<CommunityListResponse>>('/article/list', data));
}

export function queryCommunityHotRank(data: CommunityListRequest) {
  return resolve(post<ResponseData<CommunityListResponse>>('/article/list', data));
}

export function likeArticle(data: ICommunityLike) {
  return post('/community/like', data);
}

export function queryCommunityArticleById(data: { article_id: string }) {
  return resolve(post<ResponseData<IArticle>>('/article/detail', data));
}
