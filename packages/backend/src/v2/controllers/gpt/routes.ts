import { Server } from '@/utils/RegisterRouter';
import { improve, once } from './get';
import { ChatGPTOnceRequest } from '@/v2/services/gpt/get.schema';

export const gptRoutes= (server: Server) => {
  server.get('gpt/once', once, {
    schema: ChatGPTOnceRequest,
  });
  server.get('gpt/communication', once, {
    schema: ChatGPTOnceRequest,
  });
};
