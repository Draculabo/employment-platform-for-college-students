import { createLoggerService } from '../../../logger';
import { EntityManager } from 'typeorm';
import { userDAO } from '../../dao';
import { FError } from '../../../error/ControllerError';
import { ErrorCode } from '../../../error/ErrorCode';
import UserModel from '@/model/user/user';
import { successJSON } from '@/v2/controllers/internal/utils/response-json';

export class UserCreateService {
  private readonly logger = createLoggerService<'userCreate'>({
    serviceName: 'userCreate',
    ids: this.ids,
  });

  constructor(private readonly ids: IDS, private readonly DBTransaction: EntityManager, private readonly userUUID: string) {}

  public async create(
    params: {} & Pick<
      UserModel,
      'user_name' | 'user_password' | 'avatar_url' | 'gender' | 'age' | 'universities' | 'job' | 'phone' | 'work_city'
    >
  ) {
    await userDAO.insert(this.DBTransaction, params, {});
    successJSON({});
  }
}
