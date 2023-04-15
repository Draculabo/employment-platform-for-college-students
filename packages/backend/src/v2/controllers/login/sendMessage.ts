import { FastifyRequestTypebox } from '@/types/Server';
import { LoginPhoneSchema } from '@/v2/services/login/login.schema';
import { FastifyReply } from 'fastify';
import { successJSON } from '../internal/utils/response-json';

export const sendMessage = async (req: FastifyRequestTypebox<typeof LoginPhoneSchema>, res: FastifyReply) => {
  return successJSON({});
};
