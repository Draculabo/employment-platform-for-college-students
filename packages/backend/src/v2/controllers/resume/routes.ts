import { Server } from '@/utils/RegisterRouter';
import { improve, summary } from './get';
import { ChatGPTOnceRequest } from '@/v2/services/gpt/get.schema';

export const resumeRoutes = (server: Server) => {
  server.get('resume/review', summary, {
    schema: ChatGPTOnceRequest,
    auth: false,
  });
  server.get('resume/sentence', improve, {
    schema: ChatGPTOnceRequest,
    auth: false,
  });
};
