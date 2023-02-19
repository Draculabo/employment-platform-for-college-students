import StudentModel from './user/student';
import UserModel from './user/user';
import SubjectModel from './user/subject';
import UniversityModel from './user/university';
import WechatUserModel from './user/wechat';
import ArticleCommentOperatorModel from './article/article_comment_operator';
import ArticleModel from './article/article';
import CommentModel from './article/comment';
import { OAuthInfosModel } from './oauth/oauth-infos';
import { OAuthSecretsModel } from './oauth/oauth-secrets';
import { OAuthUsersModel } from './oauth/oauth-users';

export type Model =
  | UserModel
  | StudentModel
  | SubjectModel
  | UniversityModel
  | WechatUserModel
  | ArticleCommentOperatorModel
  | ArticleModel
  | CommentModel
  | OAuthInfosModel
  | OAuthSecretsModel
  | OAuthUsersModel;
