import { PhoneSMS } from '@/constants/Config';
import { FError } from '@/error/ControllerError';
import { ErrorCode } from '@/error/ErrorCode';
import { createLoggerService } from '@/logger';
import UserPhoneModel from '@/model/user/phone';
import { userDAO, userPhoneDAO } from '@/v2/dao';
import { debugPort } from 'process';
import { EntityManager, InsertResult } from 'typeorm';

export class PhoneService {
  private readonly logger = createLoggerService<'phoneUser'>({
    serviceName: 'phoneUser',
    ids: this.ids,
  });

  constructor(private readonly ids: IDS, private readonly DBTransaction: EntityManager, private readonly userUUID: string) {}
  public async create(data: { phone: string }) {
    const { phone } = data;
    await userDAO.update(
      this.DBTransaction,
      {
        phone,
      },
      {
        user_uuid: this.userUUID,
      }
    );
    // await userPhoneDAO.insert(this.DBTransaction, {
    //   user_uuid: this.userUUID,
    //   user_name: userName,
    //   phone_number: phone,
    // });
  }

  public async exist(): Promise<boolean> {
    const result =
      (await userDAO.count(this.DBTransaction, {
        user_uuid: this.userUUID,
      })) >= 1;
    return result;
  }

  public async existPhone(phone: string): Promise<boolean> {
    // if (!PhoneService.enable) {
    //   return false;
    // }

    // const result = await userDAO.findOne(this.DBTransaction, ['id'], {
    return false;

    //   phone: phone,
    // });

    // return !!result;
  }

  public async assertExist(): Promise<void> {
    const result = await this.exist();

    if (!result) {
      throw new FError(ErrorCode.UserNotFound);
    }
  }

  public async userUUIDByPhone(phone: string): Promise<string | null> {
    const result = await userDAO.findOne(this.DBTransaction, ['user_uuid'], {
      phone: String(phone),
    });

    return result ? result.user_uuid : null;
  }

  private static get enable(): boolean {
    return PhoneSMS.enable;
  }
}
