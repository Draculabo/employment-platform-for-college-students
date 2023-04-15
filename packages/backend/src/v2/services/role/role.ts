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
import { deleteRoleSchema, roleListSchema, insertRoleSchema, updateRoleSchema } from './schema';
import GroupModel from '@/model/group/group';
import GroupUserModel from '@/model/group/groupUser';
import RoleModel from '@/model/group/role';
import { v4 } from 'uuid';
import { dir } from 'console';
import RoleUserModel from '@/model/group/roleUser';
import { paginationParse } from '@/utils/pagination';
export default class RoleService {
  constructor(private readonly ids: IDS, private readonly DBTransaction: EntityManager, private readonly userUUID: string) {}
  private readonly logger = createLoggerService<'role'>({
    serviceName: 'role',
    ids: this.ids,
  });
  public async roleList(data: Static<typeof roleListSchema['body']>) {
    debugger;
    const result = await roleDAO.find(this.DBTransaction, ['role_id', 'name', 'remark', 'status'], {
      ...omit(data, ['status']),
    });
    if (isNil(result)) {
      this.logger.info('not found data');
      throw new FError(ErrorCode.CustomNotFound);
    }
    return result;
  }
  public async insertRole(data: Static<typeof insertRoleSchema.body>) {
    await roleDAO.insert(this.DBTransaction, {
      role_id: v4(),
      ...data,
    });
  }
  public async updateRole(data: Static<typeof updateRoleSchema.body>) {
    await roleDAO.update(
      this.DBTransaction,
      {
        ...omit(data.updated, ['status']),
      },
      {
        ...data.updatedBy,
      }
    );
  }
  public async deleteRole(data: Static<typeof deleteRoleSchema.body>) {
    await roleDAO.delete(this.DBTransaction, {
      ...data,
    });
  }
}
