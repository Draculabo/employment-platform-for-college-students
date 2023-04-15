import { DataSource } from 'typeorm';
import { isDev, isTest, MySQL } from '../../constants/Config';
import UserModel from '../../model/user/user';
import UniversityModel from '../../model/user/university';
import StudentModel from '../../model/user/student';
import SubjectModel from '../../model/user/subject';
import WechatUserModel from '../../model/user/wechat';
import ArticleCommentOperatorModel from '../../model/article/article_comment_operator';
import ArticleModel from '../../model/article/article';
import CommentModel from '../../model/article/comment';
import { loggerServer } from '../../logger';
import { parseError } from '../../logger/ParseError';
import { CloudStorageConfigsModel } from '@/model/cloudStorage/CloudStorageConfigs';
import { CloudStorageFilesModel } from '@/model/cloudStorage/CloudStorageFiles';
import { CloudStorageUserFilesModel } from '@/model/cloudStorage/CloudStorageUserFiles';
import GroupModel from '@/model/group/group';
import { groupUserDAO } from '@/v2/dao';
import GroupUserModel from '@/model/group/groupUser';
import RoleModel from '@/model/group/role';
import RoleUserModel from '@/model/group/roleUser';
import MessageModel from '@/model/message/message';
import { OAuthInfosModel } from '@/model/oauth/oauth-infos';
import { OAuthSecretsModel } from '@/model/oauth/oauth-secrets';
import { OAuthUsersModel } from '@/model/oauth/oauth-users';
import UserPhoneModel from '@/model/user/phone';
import SubjectStudentModel from '@/model/user/SubjectStudent';
import UniversityStudentModel from '@/model/user/universityStudent';
import UserUniversityModel from '@/model/user/userUniversity';

export const dataSource = new DataSource({
  type: 'mysql',
  host: MySQL.host,
  username: MySQL.user,
  password: MySQL.password,
  database: MySQL.db,
  port: MySQL.port,
  entities: [
    // user
    UserModel,
    UserPhoneModel,
    WechatUserModel,
    UserUniversityModel,
    // university
    UniversityModel,
    UniversityStudentModel,
    StudentModel,
    SubjectModel,
    SubjectStudentModel,
    UserModel,
    ArticleCommentOperatorModel,
    ArticleModel,
    CommentModel,
    // CloudStorageConfigsModel,
    // CloudStorageFilesModel,
    // CloudStorageUserFilesModel,
    // group
    GroupModel,
    GroupUserModel,
    // role
    RoleModel,
    RoleUserModel,
    // message
    MessageModel,
    // oauth
    OAuthInfosModel,
    OAuthSecretsModel,
    OAuthUsersModel,
  ],
  extra: {
    connectionLimit: isTest ? 50 : 10,
  },
  timezone: 'Z',
  // logging: !isTest && isDev ? 'all' : false,
  synchronize: true,
  logging: 'all',
  maxQueryExecutionTime: !isTest && isDev ? 1 : 1000,
  charset: 'utf8mb4_unicode_ci',
});

export const orm = (): Promise<DataSource> => {
  return dataSource
    .initialize()
    .then((v) => {
      return v;
    })
    .catch((err) => {
      loggerServer.error('unable to connect to the database', parseError(err));
      process.exit(1);
    });
};
