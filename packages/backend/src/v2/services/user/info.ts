import { createLoggerService } from '../../../logger';
import { EntityManager } from 'typeorm';
import { userDAO } from '../../dao';
import { FError } from '../../../error/ControllerError';
import { ErrorCode } from '../../../error/ErrorCode';
import { dataSource } from '@/service/thirdParty/TypeORMService';
import UserModel from '@/model/user/user';
import { isNil, omit } from 'lodash';
import { existInfoSchema } from './info.type';
import { Static } from '@sinclair/typebox';

export class UserInfoService {
  private readonly logger = createLoggerService<'userInfo'>({
    serviceName: 'userInfo',
    ids: this.ids,
  });

  constructor(private readonly ids: IDS, private readonly DBTransaction: EntityManager, private readonly userUUID: string) {}
  public async baseInfo(data: { user_id?: string } = {}) {
    const result = await userDAO.findOne(this.DBTransaction, ['user_uuid', 'user_name', 'avatar_url'], {
      user_uuid: data.user_id ?? this.userUUID,
    });
    if (!result) {
      this.logger.info('user not found', {
        userInfo: {
          userUUID: data.user_id ?? this.userUUID,
        },
      });

      throw new FError(ErrorCode.UserNotFound);
    }
    return {
      ...omit(result, ['user_name']),
      username: result.user_name,
    };
  }
  public async getUniversity() {}
  public async info(data: { user_id?: string } = {}) {
    // const sql = this.DBTransaction.createQueryBuilder(UserModel, 'um');
    // if (!isNil(data.user_id)) {
    //   sql.andWhere('um.user_uuid = :user_uuid', {
    //     user_uuid: data.user_id,
    //   });
    // }
    const result = await userDAO.findOne(
      this.DBTransaction,
      ['user_uuid', 'user_name', 'account', 'avatar_url', 'phone', 'work_city', 'age', 'job', 'phone', 'gender', 'introduction'],
      {
        user_uuid: data.user_id || this.userUUID,
      }
    );
    // const result = await sql.getOne();
    if (!result) {
      this.logger.info('user not found', {
        userInfo: {
          userUUID: data.user_id ?? this.userUUID,
        },
      });

      throw new FError(ErrorCode.UserNotFound);
    }

    return {
      ...result,
    };
  }
  public async follow() {
    const result = await userDAO.findOne(this.DBTransaction, ['followings', 'followers'], {
      user_uuid: this.userUUID,
    });

    if (!result) {
      this.logger.info('user not found', {
        userInfo: {
          userUUID: this.userUUID,
        },
      });

      throw new FError(ErrorCode.UserNotFound);
    }

    return {
      ...result,
    };
  }
  public async exist(data: Static<typeof existInfoSchema.body>) {
    const result = await userDAO.count(this.DBTransaction, {
      account: data.account,
    });
    return result > 0;
  }
  public static async getUserUUID(account: string) {
    const result = await dataSource
      .getRepository(UserModel)
      .createQueryBuilder()
      .select(['user_uuid'])
      .where(`account = :account`, {
        account: account,
      })
      .getRawOne();
    if (!result) {
      throw new FError(ErrorCode.UserNotFound);
    }
    return result;
  }
}
