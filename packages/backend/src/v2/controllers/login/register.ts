import { FastifyRequestTypebox } from '@/types/Server';
import LoginService from '@/v2/services/login/login';
import { LoginRequestType, LoginSchema } from '@/v2/services/login/login.schema';
import { FastifyReply } from 'fastify';
import { failJSON, successJSON } from '../internal/utils/response-json';
import { registerSchema } from '@/v2/services/login/register.schema';
import RegisterService from '@/v2/services/login/register';
import { isNil, omit } from 'lodash';
import { v4 } from 'uuid';
import { UserInfoService } from '@/v2/services/user/info';

export const register = async (req: FastifyRequestTypebox<typeof registerSchema>, res: FastifyReply) => {
  debugger;
  const existRes = await new UserInfoService(req.ids, req.DBTransaction, req.userUUID).exist({
    account: req.body.account,
  });
  if (existRes) {
    return failJSON({
      msg: '用户已经存在',
    });
  }
  const result = await new RegisterService(req.ids, req.DBTransaction, req.userUUID).register({
    account: req.body.account,
    password: req.body.password,
    phone: req.body.phone,
  });
  return successJSON({
    token: await res.jwtSign({
      ...omit(result, ['user_uuid']),
      userUUID: result.user_uuid,
    }),
  });
};
