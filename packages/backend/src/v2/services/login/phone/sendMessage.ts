import { createLoggerService } from '@/logger';
import { EntityManager } from 'typeorm';
import { LoginPhoneSchema, LoginRequestType } from '../login.schema';
import { userDAO } from '@/v2/dao';
import { isNil, omit } from 'lodash';
import { FError } from '@/error/ControllerError';
import { ErrorCode } from '@/error/ErrorCode';
import { successJSON } from '@/v2/controllers/internal/utils/response-json';
import { pick } from 'lodash';
import { cryptoMD5 } from '@/v2/dao/assistant';
import { Static } from '@sinclair/typebox';
import { SMS, SMSUtils } from '@/utils/SMS';
import { PhoneSMS } from '@/constants/Config';
import RedisService from '@/service/thirdParty/RedisService';
import { RedisKey } from '@/utils/Redis';
import { MessageExpirationSecond, MessageIntervalSecond } from '../../../controllers/user/binding/platform/phone/Constants';
import { ResponseError } from '@/types/Server';

export default class SendMessageService {
  private readonly logger = createLoggerService<'sendMessage'>({
    serviceName: 'sendMessage',
    ids: this.ids,
  });
  constructor(private readonly ids: IDS, private readonly DBTransaction: EntityManager, private readonly userUUID: string) {}
  public async sendMessage(data: Static<typeof LoginPhoneSchema.body>) {
    const { phone } = data;
    const sms = new SMS(phone);
    const safePhone = SMSUtils.safePhone(phone);
  }
  private static async canSend(phone: string): Promise<boolean> {
    const ttl = await RedisService.ttl(RedisKey.phoneLogin(phone));

    if (ttl < 0) {
      return true;
    }

    const elapsedTime = MessageExpirationSecond - ttl;

    return elapsedTime > MessageIntervalSecond;
  }
}
