import { config } from '@/utils/ParseConfig';
import { merge } from 'lodash';
// export const importDynamic = new Function('modulePath', 'return import(modulePath)');
// const { ChatGPTAPI } = await importDynamic('chatgpt');

export class ChatService {
  // @ts-ignore
  chat;
  // @ts-ignore
  #defaultOptions: ChatGPTAPIOptions = {
    apiKey: config.chatgpt.secret,
  };
  // @ts-ignore
  constructor(options?: ChatGPTAPIOptions) {
    setTimeout(() => {
      (async () => {
        const { ChatGPTAPI } = await import('chatgpt');
        this.chat = new ChatGPTAPI(merge({}, this.#defaultOptions, options));
      })();
    }, 1000);
  }
  public get gpt() {
    return this.chat;
    // @ts-ignore
  }
  public async sendMessage(message: string, options?: SendMessageBrowserOptions) {
    const res = await this.chat.sendMessage(message, options);
    return res.text;
  }
  // @ts-ignore
  public async onceMessage(message: string, options?: SendMessageBrowserOptions) {
    debugger;
    let chatGPTAPI;
    let res;
    try {
      chatGPTAPI = await (await import('chatgpt')).ChatGPTAPI;
      this.chat = new chatGPTAPI(merge({}, this.#defaultOptions, options));
      res = await this.chat.sendMessage(message, options);
    } catch (error) {
      throw error;
    }
    return res;
  }
  public async ongoingCommunication(message: string, options?: SendMessageBrowserOptions) {
    const res = await this.chat.sendMessage(message, options);
    return res;
  }
}

export default new ChatService();
