import { FastifyRequestTypebox, Response } from '@/types/Server';
import { ChatGPTOnceRequest } from '@/v2/services/gpt/get.schema';
import GPTService from '@/v2/services/gpt/gpt';
import { successJSON } from '../internal/utils/response-json';

export const summary = async (req: FastifyRequestTypebox<typeof ChatGPTOnceRequest>): Promise<Response> => {
  const res = await new GPTService(req.ids, req.DBTransaction, req.userUUID).onceConversation(req.query);
  return successJSON(res);
};

export const improve = async (req: FastifyRequestTypebox<typeof ChatGPTOnceRequest>): Promise<Response> => {
  const res = await new GPTService(req.ids, req.DBTransaction, req.userUUID).onceConversation(req.query);
  return successJSON(res);
};
