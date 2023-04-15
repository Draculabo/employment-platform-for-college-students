import { createLoggerService } from '@/logger';
import CommentModel from '@/model/article/comment';
import { Static } from '@sinclair/typebox';
import { ChatGPTOnceRequest } from './get.schema';
import { EntityManager } from 'typeorm';
import { ChatGPTConfig } from '@/constants/Config';
// export const importDynamic = new Function('modulePath', 'return import(modulePath)');
import proxy from 'https-proxy-agent';
// const { ChatGPTAPI } = await importDynamic('chatgpt');
import fetch from 'node-fetch';
import axios from 'axios';
export default class GPTService {
  private readonly logger = createLoggerService<'gpt'>({
    serviceName: 'gpt',
    ids: this.ids,
  });
  constructor(private readonly ids: IDS, private readonly DBTransaction: EntityManager, private readonly userUUID: string) {}
  public async onceConversation(data: Static<typeof ChatGPTOnceRequest.querystring>) {
    const bodyJson = {
      model: 'text-davinci-003',
      prompt: `Human: ${data.content}\\nAI:`,
      temperature: 0.7,
      max_tokens: 256,
      stop: ['Human:', 'AI:'],
    };
    const res = await axios
      .post(`${ChatGPTConfig.proxy}/v1/completions`, bodyJson, {
        headers: {
          Authorization: `Bearer ${ChatGPTConfig.secret}`,
          'Content-Type': 'application/json',
        },
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
    return res.data?.choices?.[0] ?? '';
  }
}
