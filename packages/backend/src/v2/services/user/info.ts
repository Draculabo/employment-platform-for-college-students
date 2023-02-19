import { createLoggerService } from '../../../logger';
import { EntityManager } from 'typeorm';
import { userDAO } from '../../dao';
import { FError } from '../../../error/ControllerError';
import { ErrorCode } from '../../../error/ErrorCode';

export class UserInfoService {
  private readonly logger = createLoggerService<'userInfo'>({
    serviceName: 'userInfo',
    ids: this.ids,
  });

  constructor(private readonly ids: IDS, private readonly DBTransaction: EntityManager, private readonly userUUID: string) {}

  public async info() {
    const result = await userDAO.findOne(
      this.DBTransaction,
      ['user_uuid', 'user_name', 'account', 'avatar_url', 'phone', 'universities', 'work_city'],
      {
        user_uuid: this.userUUID,
      }
    );
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
}
