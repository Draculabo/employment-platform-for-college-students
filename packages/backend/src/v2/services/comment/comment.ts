import { FError } from '@/error/ControllerError';
import { ErrorCode } from '@/error/ErrorCode';
import { createLoggerService } from '@/logger';
import ArticleModel from '@/model/article/article';
import CommentModel from '@/model/article/comment';
import { successJSON } from '@/v2/controllers/internal/utils/response-json';
import { ArticleDAO, CommentDAO } from '@/v2/dao';
import { get, isEmpty, isNil, keys, omit, pick } from 'lodash';
import { DeleteQueryBuilder, EntityManager } from 'typeorm';
import { CommentListRequestType, deleteCommentSchema, insertCommentSchema } from './get.schema';
import { paginationParse } from '@/utils/pagination';
import { Static } from '@sinclair/typebox';
import { v4 } from 'uuid';
import { composeConfigCompose } from '@/v2/dao/configParse';
import UserModel from '@/model/user/user';

export default class CommentInfoService {
  private readonly logger = createLoggerService<'commentInfo'>({
    serviceName: 'commentInfo',
    ids: this.ids,
  });
  constructor(private readonly ids: IDS, private readonly DBTransaction: EntityManager, private readonly userUUID: string) {}
  public async getComment() {
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
  private async getComments(input: CommentModel[]): Promise<any[]> {
    // 找到顶级评论
    const result = input.filter((item) => !item.comment_by);

    // 递归处理子评论
    function buildChildren(parent) {
      parent.children = input.filter((item) => item.comment_by === parent.comment_id);

      parent.children.forEach((child) => {
        buildChildren(child);
      });
    }

    // 处理每个顶级评论的子评论
    result.forEach((item) => {
      buildChildren(item);
    });

    return result;
  }
  public async commentList(data: CommentListRequestType) {
    // let articleResult = await this.DBTransaction.createQueryBuilder(ArticleModel, 'am')
    //   .addSelect('comments')
    //   .andWhere('article_id = :article_id', {
    //     article_id: data.article_id,
    //   })
    //   .getOne();
    const sql = this.DBTransaction.createQueryBuilder(CommentModel, 'cm')
      // .innerJoinAndMapOne('cm.comment_id', ArticleModel, 'am', "am.comments like CONCAT('%' , cm.comment_id , '%')")
      .innerJoinAndMapOne('cm.user_id', UserModel, 'um', 'cm.user_id = um.user_uuid');
    if (!isNil(data.article_id)) {
      sql.andWhere('cm.article_id = :article_id', {
        article_id: data.article_id,
      });
    }
    if (!isNil(data.user_id)) {
      sql.andWhere('cm.user_id = :user_id', {
        user_id: data.user_id,
      });
    }
    if (!isNil(data.comment_id)) {
      sql.andWhere('cm.comment_id = :comment_id', {
        comment_id: data.comment_id,
      });
    }
    let result = await composeConfigCompose(sql, data.config).getMany();
    result = result.map((v) => {
      return {
        ...omit(v, ['id', 'user_id']),
        userInfo: {
          ...(pick(v.user_id, ['user_uuid', 'avatar_url']) as Object),
          username: get(v.user_id, ['user_name']),
        },
      };
    }) as any[];
    // const result = await sql.getMany();

    if (isNil(result)) {
      this.logger.info('comment list not found', {
        commentInfo: {
          userUUID: this.userUUID,
        },
      });
      throw new FError(ErrorCode.CustomNotFound);
    }
    return this.getComments(result);
    // const output = await Promise.all(
    //   result.map(async (v) => {
    //     const subComments = await new CommentInfoService(this.ids, this.DBTransaction, this.userUUID).getComments(v.comment_id);
    //     return await Promise.resolve({
    //       ...omit(v, ['id', 'user_id']),
    //       comments: subComments,
    //       userInfo: {
    //         ...(pick(v.user_id, ['user_uuid', 'avatar_url']) as Object),
    //         username: get(v.user_id, ['user_name']),
    //       },
    //     });
    //   })
    // ).catch((err) => {
    //   console.error(err);
    //   throw err;
    // });
    // return output;
  }
  public async insertComment(data: Static<typeof insertCommentSchema.body>) {
    const existComment =
      !isEmpty(data.comment_by) &&
      (await CommentDAO.count(this.DBTransaction, {
        comment_id: data.comment_by,
      }));
    if (existComment === 0) {
      throw new Error('not found specific comment');
    }
    // const { comments = '' } =
    //   (await ArticleDAO.findOne(this.DBTransaction, ['comments'], {
    //     article_id: data.article_id,
    //   })) ?? {};
    const comment_id = v4();
    await CommentDAO.insert(this.DBTransaction, {
      content: data.content,
      user_id: data.user_id || this.userUUID,
      comment_by: data.comment_by,
      comment_id,
      article_id: data.article_id,
    });
    // ArticleDAO.update(
    //   this.DBTransaction,
    //   {
    //     comments: () => {
    //       if (isEmpty(comments)) {
    //         return `'${comment_id}'`;
    //       }
    //       return `'${comments},${comment_id}'`;
    //     },
    //   },
    //   {
    //     article_id: data.article_id,
    //   }
    // )
  }
  public async deleteComment(data: Static<typeof deleteCommentSchema.body>) {
    const { comments = [] } =
      (await ArticleDAO.findOne(this.DBTransaction, ['comments'], {
        article_id: data.article_id,
      })) ?? {};
    await Promise.all([
      CommentDAO.delete(this.DBTransaction, {
        comment_id: data.comment_id,
      }),
      // ArticleDAO.update(
      //   this.DBTransaction,
      //   {
      //     comments: comments.filter((c) => c !== data.comment_id),
      //   },
      //   {
      //     user_id: data.user_id,
      //     article_id: data.article_id,
      //   }
      // ),
    ]);
  }
}
