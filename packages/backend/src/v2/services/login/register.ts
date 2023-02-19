import { createLoggerService } from '@/logger';
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

export default class RegisterService {
  private readonly logger = createLoggerService<'register'>({
    serviceName: 'register',
    ids: this.ids,
  });
  constructor(private readonly ids: IDS, private readonly DBTransaction: EntityManager, private readonly userUUID: string) {}
  public async register(body: RegisterSchemaType) {
    const result = userDAO.insert(this.DBTransaction, {
      account: body.account,
      user_password: body.password,
      user_uuid: v4(),
    });
    if (isNil(result)) {
      this.logger.info('create account failed');
      throw new FError(ErrorCode.CustomNotFound);
    }
    return {};
  }
}
