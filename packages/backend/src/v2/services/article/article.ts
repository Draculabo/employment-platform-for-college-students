import { DAO } from '@/dao/Type';
import { FError } from '@/error/ControllerError';
import { ErrorCode } from '@/error/ErrorCode';
import { createLoggerService } from '@/logger';
import { Model } from '@/model';
import ArticleModel from '@/model/article/article';
import { articleList } from '@/v2/controllers/article/get';
import { successJSON } from '@/v2/controllers/internal/utils/response-json';
import { ArticleDAO, CommentDAO, ConfigType } from '@/v2/dao';
import { Static } from '@sinclair/typebox';
import { isNil, keys, pick } from 'lodash';
import { EntityManager } from 'typeorm';
import { articleSchema } from './get.schema';
type ArticleResponse = {} & Pick<
  ArticleModel,
  'article_id' | 'article_type' | 'content' | 'created_at' | 'share_number' | 'title' | 'user_id'
>;
const exposeKeys: (keyof ArticleModel)[] = ['article_id', 'article_type', 'content', 'created_at', 'share_number', 'title', 'user_id'];
export default class ArticleService {
  constructor(private readonly ids: IDS, private readonly DBTransaction: EntityManager, private readonly userUUID: string) {}
  private readonly logger = createLoggerService<'commentInfo'>({
    serviceName: 'commentInfo',
    ids: this.ids,
  });
  public async getArticleList(data: Static<typeof articleSchema.body>) {
    const result = await ArticleDAO.find(
      this.DBTransaction,
      exposeKeys,
      {
        article_id: data.article_id,
      },
      {
        ...data.config,
      }
    );
    if (isNil(result)) {
      this.logger.info('not found comment list');
      throw new FError(ErrorCode.CustomNotFound);
    }
    return successJSON({
      result,
    });
  }
  public async insertComment(data: Pick<ArticleModel, 'content' | 'user_id'>) {
    const result = await CommentDAO.insert(this.DBTransaction, {
      content: data.content,
      user_id: data.user_id,
    });
    if (isNil(result)) {
      this.logger.info('create comment failed', {
        commentInfo: {
          userUUID: this.userUUID,
        },
      });
      throw new FError(ErrorCode.CustomNotFound);
    }
    return successJSON({});
  }
  public async updateArticle(data: {
    updatedBy: {
      article_id: ArticleModel['article_id'];
    };
    updated: Pick<ArticleModel, 'article_type' | 'content' | 'share_number' | 'title'>;
  }) {
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
    const result = await CommentDAO.delete(this.DBTransaction, {
      comment_id: data.article_id,
    });
    if (isNil(result)) {
      this.logger.info('delete article failed', {
        commentInfo: {
          userUUID: this.userUUID,
        },
      });
      throw new FError(ErrorCode.CustomNotFound);
    }
    return successJSON({});
  }
}
