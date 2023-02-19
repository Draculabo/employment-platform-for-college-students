import { FastifyRequestTypebox } from '@/types/Server';
import LoginService from '@/v2/services/login/login';
import { LoginRequestType, LoginSchema } from '@/v2/services/login/login.schema';
import { FastifyReply } from 'fastify';
import { successJSON } from '../internal/utils/response-json';
import { registerSchema } from '@/v2/services/login/register.schema';
import RegisterService from '@/v2/services/login/register';
import { isNil } from 'lodash';
import { v4 } from 'uuid';

export const register = async (req: FastifyRequestTypebox<typeof registerSchema>, res: FastifyReply) => {
  const result = await new RegisterService(req.ids, req.DBTransaction, req.userUUID).register({
    account: req.body.account,
    password: req.body.password,
  });
  const userUUID = v4();
  return successJSON({
    token: await res.jwtSign({
      account: req.body.account,
      userUUID: userUUID,
    }),
  });
};
