import { FError } from '@/error/ControllerError';
import { ErrorCode } from '@/error/ErrorCode';
import { createLoggerService } from '@/logger';
import ArticleModel from '@/model/article/article';
import type CommentModel from '@/model/article/comment';
import { successJSON } from '@/v2/controllers/internal/utils/response-json';
import { CommentDAO, ConfigType } from '@/v2/dao';
import { isNil, keys, omit, pick } from 'lodash';
import { EntityManager } from 'typeorm';
import { CommentListRequestType } from './get.schema';
type BasicCommentInfoReturn = Pick<CommentModel, 'content' & 'created_at' & 'updated_at' & 'user_id'>;

export default class CommentInfoService {
  private readonly logger = createLoggerService<'commentInfo'>({
    serviceName: 'commentInfo',
    ids: this.ids,
  });
  constructor(private readonly ids: IDS, private readonly DBTransaction: EntityManager, private readonly userUUID: string) {}
  public async getComment(): Promise<BasicCommentInfoReturn> {
    const result = await CommentDAO.findOne(this.DBTransaction, ['content', 'created_at', 'updated_at', 'user_id'], {
      user_id: this.userUUID,
    });
    if (isNil(result)) {
      this.logger.info('comment not found', {
        commentInfo: {
          userUUID: this.userUUID,
        },
      });
      throw new FError(ErrorCode.CustomNotFound);
    }
    return result;
  }
  public async commentList(data: CommentListRequestType) {
    const configArray = ['limit', 'offset', 'distinct', 'order'];
    const where = omit(data, configArray);

    const result = await CommentDAO.find(
      this.DBTransaction,
      ['content', 'created_at', 'updated_at', 'user_id'],
      {
        user_id: this.userUUID,
        ...where,
      },
      {
        ...pick(data.config || {}, configArray),
      }
    );
    if (isNil(result)) {
      this.logger.info('comment list not found', {
        commentInfo: {
          userUUID: this.userUUID,
        },
      });
      throw new FError(ErrorCode.CustomNotFound);
    }
    return result;
  }
  public async insertComment(data: Pick<CommentModel, 'content' | 'user_id'>) {
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
  public async deleteComment(data: {} & Pick<CommentModel, 'comment_id'>) {
    const result = await CommentDAO.delete(this.DBTransaction, {
      comment_id: data.comment_id,
    });
    if (isNil(result)) {
      this.logger.info('delete ccomment failed', {
        commentInfo: {
          userUUID: this.userUUID,
        },
      });
      throw new FError(ErrorCode.CustomNotFound);
    }
    return successJSON({});
  }
}
