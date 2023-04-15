import { FError } from '@/error/ControllerError';
import { ErrorCode } from '@/error/ErrorCode';
import { createLoggerService } from '@/logger';
import ArticleModel from '@/model/article/article';
import { articleList } from '@/v2/controllers/article/get';
import { successJSON } from '@/v2/controllers/internal/utils/response-json';
import { ArticleDAO, CommentDAO, userDAO } from '@/v2/dao';
import { Static } from '@sinclair/typebox';
import { isEmpty, isNil, keys, omit, pick } from 'lodash';
import { EntityManager } from 'typeorm';
import { articleSchema, insertArticleSchema, updateArticleSchema } from './get.schema';
import { insertCommentSchema } from '../comment/get.schema';
import dayjs from 'dayjs';
import { v4 } from 'uuid';
import { paginationParse } from '@/utils/pagination';
import UserModel from '@/model/user/user';
import CommentModel from '@/model/article/comment';
import CommentInfoService from '../comment/comment';
import { UserInfoService } from '../user/info';
import { composeWhereClause } from '@/v2/dao/assistant';
import { debug } from 'console';
import { composeConfigCompose } from '@/v2/dao/configParse';
type ArticleResponse = {} & Pick<
  ArticleModel,
  'article_id' | 'article_type' | 'content' | 'created_at' | 'share_number' | 'title' | 'user_id'
>;
const exposeKeys: (keyof ArticleModel)[] = ['article_id', 'article_type', 'content', 'created_at', 'share_number', 'title', 'user_id'];
export default class ArticleService {
  constructor(private readonly ids: IDS, private readonly DBTransaction: EntityManager, private readonly userUUID: string) {}
  private readonly logger = createLoggerService<'article'>({
    serviceName: 'article',
    ids: this.ids,
  });
  public async getArticleList(data: Static<typeof articleSchema.body>) {
    const sql = this.DBTransaction.createQueryBuilder(ArticleModel, 'am').innerJoinAndMapOne(
      'am.user_id',
      UserModel,
      'um',
      'am.user_id = um.user_uuid'
    );
    if (!isEmpty(data.keyword)) {
      sql.andWhere(`title like '%${data.keyword}%'`);
    }
    if (!isNil(data.user_id)) {
      sql.andWhere('user_id = :user_id', {
        user_id: data.user_id,
      });
    }
    if (!isNil(data.article_type)) {
      sql.andWhere(`am.article_type = :article_type `, {
        article_type: `${data.article_type}`,
      });
    }

    sql.andWhere('am.is_delete = 0');
    const result = await composeConfigCompose(sql, data.config, 'am').getMany();
    if (isNil(result)) {
      this.logger.info('not found article list');
      throw new FError(ErrorCode.CustomNotFound);
    }
    return result.map((v) => {
      return {
        userInfo: {
          // @ts-ignore
          user_id: v.user_id.user_uuid,
          //@ts-ignore
          username: v.user_id.user_name,
          //@ts-ignore
          avatar_url: v.user_id.avatar_url,
        },
        ...omit(v, 'user_id'),
      };
    });
  }
  public async getArticleById(data: Static<typeof articleSchema.body>) {
    const sql = await this.DBTransaction.createQueryBuilder(ArticleModel, 'am');
    // .where('cm.comment_id in am.comments');
    // const result = await ArticleDAO.findOne(this.DBTransaction, exposeKeys, {
    //   ...data,
    // });
    if (!isNil(data.article_id)) {
      sql.andWhere('am.article_id = :article_id', {
        article_id: data.article_id,
      });
    }
    const result = await sql.getOne();
    if (isNil(result)) {
      this.logger.info('not found specific article');
      throw new FError(ErrorCode.CustomNotFound);
    }
    // const userInfo = await userDAO.findOne(this.DBTransaction, ['user_name', 'avatar_url'], {
    //   user_uuid: result?.user_id,
    // });
    const comments = await new CommentInfoService(this.ids, this.DBTransaction, this.userUUID).commentList({
      article_id: result.article_id,
    });
    const userInfo = await new UserInfoService(this.ids, this.DBTransaction, this.userUUID).baseInfo({
      user_id: result.user_id,
    });
    return {
      ...result,
      comments,
      userInfo,
    };
  }
  public async insertArticle(data: Static<typeof insertArticleSchema.body>) {
    await ArticleDAO.insert(this.DBTransaction, {
      title: data.title,
      content: data.content,
      user_id: data.user_id ?? this.userUUID,
      article_id: v4(),
      article_type: data.article_type,
    });
  }
  public async updateArticle(data: Static<typeof updateArticleSchema.body>) {
    const result = await ArticleDAO.update(
      this.DBTransaction,
      {
        ...data.updated,
      },
      {
        article_id: data.updatedBy.article_id,
      }
    );
    if (isNil(result)) {
      this.logger.info('updated article failed');
      throw new FError(ErrorCode.CustomNotFound);
    }
    return successJSON({});
  }
  public async deleteArticle(data: {} & Pick<ArticleModel, 'article_id'>) {
    await ArticleDAO.delete(this.DBTransaction, {
      article_id: data.article_id,
    });
  }
  public async getArticleType() {
    const result = await ArticleDAO.find(this.DBTransaction, ['article_type'], {});
    if (isNil(result)) {
      this.logger.info('get info failed', {
        article: {
          userUUID: this.userUUID,
        },
      });
      throw new FError(ErrorCode.CustomNotFound);
    }
    return result;
  }
}
