import { createLoggerService } from '@/logger';
import { EntityManager } from 'typeorm';
import { LoginRequestType } from './login.schema';
import { userDAO } from '@/v2/dao';
import { isNil } from 'lodash';
import { FError } from '@/error/ControllerError';
import { ErrorCode } from '@/error/ErrorCode';
import { successJSON } from '@/v2/controllers/internal/utils/response-json';
import { pick } from 'lodash';

export default class LoginService {
  private readonly logger = createLoggerService<'login'>({
    serviceName: 'login',
    ids: this.ids,
  });
  constructor(private readonly ids: IDS, private readonly DBTransaction: EntityManager, private readonly userUUID: string) {}
  public async login(body: LoginRequestType) {
    const result = await userDAO.findOne(this.DBTransaction, ['account', 'avatar_url'], {
      account: body.account,
      user_password: body.password,
    });
    if (isNil(result)) {
      this.logger.info('user not exist');
      throw new FError(ErrorCode.UserNotFound);
    }
    return {
      ...result,
    };
  }
}
