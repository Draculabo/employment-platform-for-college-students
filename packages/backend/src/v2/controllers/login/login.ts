import { FastifyRequestTypebox } from '@/types/Server';
import LoginService from '@/v2/services/login/login';
import { LoginRequestType, LoginSchema } from '@/v2/services/login/login.schema';
import { FastifyReply } from 'fastify';
import { successJSON } from '../internal/utils/response-json';

export const login = async (req: FastifyRequestTypebox<typeof LoginSchema>, res: FastifyReply) => {
  const result = await new LoginService(req.ids, req.DBTransaction, req.userUUID).login({
    account: req.body.account,
    password: req.body.password,
  });
  return successJSON({
    token: await res.jwtSign({ ...result }),
  });
};
