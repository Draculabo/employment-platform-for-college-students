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

export const dataSource = new DataSource({
  type: 'mysql',
  host: MySQL.host,
  username: MySQL.user,
  password: MySQL.password,
  database: MySQL.db,
  port: MySQL.port,
  entities: [
    UserModel,
    UniversityModel,
    StudentModel,
    SubjectModel,
    UserModel,
    WechatUserModel,
    ArticleCommentOperatorModel,
    ArticleModel,
    CommentModel,
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
