import { Type } from '@sinclair/typebox';

export const ChatGPTOnceRequest = {
  querystring: Type.Object({
    content: Type.String(),
  }),
};
