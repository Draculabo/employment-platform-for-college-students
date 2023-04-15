import { PaginationParams } from '@/services/type';
import { ArticleType } from '@/types/enums';
import { UserBaseInfo } from '../user';
import { IComment } from '../comment/type';

export interface CommunityListRequest {
  config: PaginationParams;
  keyword?: string;
  article_type?: ArticleType;
  user_id?: string;
}
export interface IArticle {
  article_id: string;
  article_type: ArticleType;
  comments: IComment[];
  content: string;
  created_at: string;
  share_number: number;
  title: string;
  updated_at: string;
  user_id: string;
  userInfo: UserBaseInfo;
}
export interface CommunityListResponse {
  list: IArticle[];
}
