import { createLoggerService } from '@/logger';
import { createHash } from 'crypto';
import { EntityManager } from 'typeorm';
import { LoginRequestType } from './login.schema';
import { userDAO } from '@/v2/dao';
import { isNil } from 'lodash';
import { FError } from '@/error/ControllerError';
import { ErrorCode } from '@/error/ErrorCode';
import { successJSON } from '@/v2/controllers/internal/utils/response-json';
import { pick } from 'lodash';
import { RegisterSchemaType } from './register.schema';
import { v4 } from 'uuid';
import { cryptoMD5 } from '@/v2/dao/assistant';
import { UserInfoService } from '../user/info';

export default class RegisterService {
  private readonly logger = createLoggerService<'register'>({
    serviceName: 'register',
    ids: this.ids,
  });
  constructor(private readonly ids: IDS, private readonly DBTransaction: EntityManager, private readonly userUUID: string) {}
  public async register(body: RegisterSchemaType) {
    debugger;
    const user_uuid = v4();
    await userDAO.insert(this.DBTransaction, {
      account: body.account,
      user_password: cryptoMD5(body.password),
      user_uuid: user_uuid,
      user_name: body.account,
      phone: body.phone,
    });
    return {
      username: body.account,
      account: body.account,
      avatar_url: '',
      user_uuid,
    };
  }
}
