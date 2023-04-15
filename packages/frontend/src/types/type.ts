import { ArticleType } from './enums';

export interface IUser {
  account: string;
  password: string;
}

export interface IResponse<T> {
  status: number;
  // msg: string;
  data?: T;
  // total?: number;
  // commentsTotal?: number;
}

export interface ICommunityArticle {
  title: string;
  content: string;
  article_type: ArticleType;
  user_id?: string;
}

export interface ICommunityArticleUpdate {
  title: string;
  content: string;
  professional: string;
  introduce: string;
  articleId: number;
}

export interface ICommunityCondition {
  pageNo: number;
  pageSize: number;
  tab: number;
  uid: number;
  // professional: string;
  keyword: string;
}

export interface ICommunityLike {
  articleId: string;
  userId: string;
}
export interface IBaseUserInfo {
  user_uuid: string;
  user_name: string;
  account: string;
}
export enum Gender {
  Male = 'Male',
  FeMale = 'FeMale',
  None = 'None',
}
export interface IBaseUserInfoData {
  user_name: string;
  gender: Gender;
  age: number;
  job: string;
  createTime?: string;
  avatar_url: string;
  introduction?: string;
  graduation: string;
  school: string;
  updateTime?: string;
  work_city?: string;
}
export interface IUserInfo extends IBaseUserInfo, IBaseUserInfoData {
  uid: number;
  phone: string;
  professional: string;
  origin: string;
}

export interface IArticle {
  title: string;
  content: string;
  professional: string;
  user_id: number;
  likes: number[];
  commentTotal: number;
  hot: number;
  created_at: string;
  updated_at: string;
  article_id: number;
  introduce: string;
  authorInfo: IUserInfo;
}

export interface ICommentReply {
  commentId: number;
  articleId: number;
  authorId: number;
  authorInfo: IUserInfo;
  content: string;
  images: string;
  level: number;
  createTime: string;
  posterCommentId: number;
  replyNickName: string;
}

export interface IComment {
  commentId: number;
  articleId: number;
  content: string;
  images: string;
  authorId: number;
  authorInfo: IUserInfo;
  level: number;
  createTime: string;
  children: ICommentReply[];
}

export interface IPublishComment {
  content: string;
  articleId: number;
  level: number;
  authorId: number;
  replyArticleAuthorId: number;
}

export interface IPublishCommentReply {
  content: string;
  articleId: number;
  level: number;
  authorId: number;
  posterCommentId: number;
  replyAuthorId: number;
  replyArticleAuthorId: number;
}

export interface IArticleDetail {
  title: string;
  content: string;
  professional: string;
  authorId: number;
  like: number;
  hot: number;
  createTime: string;
  updateTime: string;
  articleId: number;
  introduce: string;
  authorInfo: IUserInfo;
  comments: IComment[];
}

export interface INotificationList {
  read: number;
  articleId: number;
  commentId: number;
  replyCommentId: number;
  posterCommentId: number;
  commentContent: { content: string; createTime: string };
  commentUserInfo: IUserInfo;
  replyContent: { content?: string; title?: string; createTime: string };
  replyUserInfo: IUserInfo;
}

export interface ICommentPosition {
  pageNum: number;
  position: number;
  data: IComment[];
}
