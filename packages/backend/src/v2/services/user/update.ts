import { createLoggerService } from '../../../logger';
import { EntityManager } from 'typeorm';
import { userDAO } from '../../dao';
import { Static } from '@sinclair/typebox';
import { forgotPasswordSchema, updatePasswordSchema, updatePhoneSchema, updateUserInfoSchema } from './update.schema';
import { Gender } from '@/constants/Project';
import { omit } from 'lodash';
import { cryptoMD5 } from '@/v2/dao/assistant';
import { failJSON } from '@/v2/controllers/internal/utils/response-json';

export class UserUpdateService {
  private readonly logger = createLoggerService<'userUpdate'>({
    serviceName: 'userUpdate',
    ids: this.ids,
  });

  constructor(private readonly ids: IDS, private readonly DBTransaction: EntityManager, private readonly userUUID: string) {}

  public async userName(newUserName: string): Promise<void> {
    await userDAO.update(
      this.DBTransaction,
      {
        user_name: newUserName,
      },
      {
        user_uuid: this.userUUID,
      }
    );
    this.logger.debug('user name updated', {
      userUpdate: {
        newUserName,
      },
    });
  }
  public async updatePassword(data: Static<typeof updatePasswordSchema.body>) {
    const count = await userDAO.count(this.DBTransaction, {
      user_uuid: this.userUUID,
      user_password: cryptoMD5(data.oldPassword),
    });
    if (count === 0) {
      throw new Error('password is error');
    }
    await userDAO.update(
      this.DBTransaction,
      {
        user_password: cryptoMD5(data.newPassword),
      },
      {
        user_uuid: this.userUUID,
      }
    );
  }
  public async forgotPassword(data: Static<typeof forgotPasswordSchema.body>) {
    const exist =
      (await userDAO.count(this.DBTransaction, {
        phone: data.phone,
      })) > 0;
    if (!exist) {
      throw new Error('手机号码不存在');
    }
    await userDAO.update(
      this.DBTransaction,
      {
        user_password: data.password,
      },
      {
        phone: data.phone,
      }
    );
  }
  public async updateInfo(data: Static<typeof updateUserInfoSchema.body>) {
    debugger;
    await userDAO.update(
      this.DBTransaction,
      {
        ...omit(data, ['school']),
      },
      {
        user_uuid: this.userUUID,
      }
    );
    this.logger.debug('user info updated', {
      userUpdate: {
        ...data,
      },
    });
  }
  public async updatePhone(data: Static<typeof updatePhoneSchema.body>) {
    await userDAO.update(
      this.DBTransaction,
      {
        phone: data.phone,
      },
      {
        user_uuid: this.userUUID,
      }
    );
  }

  public async avatarURL(newAvatarURL: string): Promise<void> {
    await userDAO.update(
      this.DBTransaction,
      {
        avatar_url: newAvatarURL,
      },
      {
        user_uuid: this.userUUID,
      }
    );
    this.logger.debug('avatar URL updated', {
      userUpdate: {
        newAvatarURL,
      },
    });
  }
}
