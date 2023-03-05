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
import GroupModel from './group/group';
import GroupUserModel from './group/groupUser';
import RoleUserModel from './group/roleUser';
import RoleModel from './group/role';
import MessageModel from './message/message';
import UserPhoneModel from './user/phone';
import SubjectStudentModel from './user/SubjectStudent';
import UniversityStudentModel from './user/universityStudent';
import UserUniversityModel from './user/userUniversity';

export type Model =
  | UserModel
  | UserPhoneModel
  | WechatUserModel
  | UserUniversityModel
  | StudentModel
  | SubjectModel
  | SubjectStudentModel
  | UniversityModel
  | UniversityStudentModel
  | WechatUserModel
  | ArticleCommentOperatorModel
  | ArticleModel
  | CommentModel
  | OAuthInfosModel
  | OAuthSecretsModel
  | OAuthUsersModel
  | GroupModel
  | GroupUserModel
  | RoleUserModel
  | RoleModel
  | MessageModel;
