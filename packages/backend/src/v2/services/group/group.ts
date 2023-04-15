import { DAO } from '@/dao/Type';
import { FError } from '@/error/ControllerError';
import { ErrorCode } from '@/error/ErrorCode';
import { createLoggerService } from '@/logger';
import { Model } from '@/model';
import ArticleModel from '@/model/article/article';
import { articleList } from '@/v2/controllers/article/get';
import { successJSON } from '@/v2/controllers/internal/utils/response-json';
import { ArticleDAO, CommentDAO, groupDAO, groupUserDAO, roleDAO, roleUserDAO } from '@/v2/dao';
import { Static } from '@sinclair/typebox';
import { isNil, keys, omit, pick } from 'lodash';
import { EntityManager } from 'typeorm';
import { deleteGroupSchema, groupListSchema, insertGroupSchema, joinGroupSchema, updateGroupSchema } from './schema';
import GroupModel from '@/model/group/group';
import GroupUserModel from '@/model/group/groupUser';
import RoleModel from '@/model/group/role';
import { GroupUserService } from './groupUser';
import { v4 } from 'uuid';
import { dir } from 'console';
import RoleUserModel from '@/model/group/roleUser';
export default class GroupService {
  constructor(private readonly ids: IDS, private readonly DBTransaction: EntityManager, private readonly userUUID: string) {}
  private readonly logger = createLoggerService<'group'>({
    serviceName: 'group',
    ids: this.ids,
  });
  public async groupList(data: Static<typeof groupListSchema['body']>) {
    const result = await this.DBTransaction.createQueryBuilder(GroupModel, 'gm')
      .addSelect('gm.user_id')
      .addSelect('gm.introduction')
      .addSelect('gm.status')
      .addSelect('gm.count')
      .addSelect('gm.top_level')
      .innerJoin(GroupUserModel, 'gum', 'gum.user_id = gm.user_id')
      .innerJoin(RoleUserModel, 'rum', 'gum.user_id = rum.user_id')
      .innerJoin(RoleModel, 'rm', 'rm.role_id= rum.role_id')
      .addSelect('rm.name')
      .where("rm.status = 'open'")
      // .groupBy('gum.user_id')
      .getRawMany();
    if (isNil(result)) {
      this.logger.info('not found data');
      throw new FError(ErrorCode.CustomNotFound);
    }
    return result;
  }
  public async insertGroup(data: Static<typeof insertGroupSchema.body>) {
    await groupDAO.insert(this.DBTransaction, {
      ...data,
      group_id: v4(),
    });
    const group_id = v4();
    const organizer = (
      await roleDAO.findOne(this.DBTransaction, ['role_id'], {
        name: '组长',
      })
    )?.role_id;
    if (isNil(organizer)) {
      this.logger.error('not found organizer');
      throw new FError(ErrorCode.CustomNotFound);
    }
    await Promise.all([
      groupDAO.insert(this.DBTransaction, {
        ...data,
        group_id,
      }),
      groupUserDAO.insert(this.DBTransaction, {
        group_id,
        user_id: this.userUUID,
      }),
      roleUserDAO.insert(this.DBTransaction, {
        role_id: organizer,
        user_id: this.userUUID,
      }),
    ]).catch((err) => {
      console.log(err);
      throw err;
    });
  }
  public async updateGroup(data: Static<typeof updateGroupSchema.body>) {
    const a = await this.DBTransaction.createQueryBuilder(GroupModel, 'gm')
      .innerJoin(RoleModel, 'rm', 'gm.user_id = rm.user_id')
      .addSelect('rm.role_id')
      .andWhere(`gm.user_id = ${this.userUUID}`)
      .getRawOne();
    console.log(a);
    await Promise.all([
      groupDAO.update(
        this.DBTransaction,
        {
          ...omit(data.updated, 'transfer_id'),
        },
        {
          group_id: data.updatedBy.group_id,
        }
      ),
      roleUserDAO.update(
        this.DBTransaction,
        {
          user_id: data.updated.transfer_id,
        },
        {
          user_id: this.userUUID,
        }
      ),
    ]).catch((err) => {
      console.log(err);
    });
  }
  public async deleteGroup(data: Static<typeof deleteGroupSchema.body>) {
    const result = await this.DBTransaction.createQueryBuilder(GroupModel, 'gm')
      .innerJoin(GroupUserModel, 'gum', 'gm.group_id = gum.group_id')
      .innerJoin(RoleModel, 'rm', 'rm.user_id = gum.user_id')
      .delete()
      .where(`gm.group_id = ${data.group_id}`)
      .execute();
    console.log(result);
    if (isNil(result)) {
      this.logger.info('delete group failed', {});
      throw new FError(ErrorCode.CustomNotFound);
    }
    return successJSON({});
  }
  public async joinGroup(data: Static<typeof joinGroupSchema.body>) {
    await Promise.all(
      data.users!.map((v) => {
        return new GroupUserService(data.group_id, v).insertSelf(this.DBTransaction);
      })
    ).catch((err) => {
      console.log(err);
    });
  }
}
