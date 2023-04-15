import { Server } from '@/utils/RegisterRouter';
import { bindingPhone } from './bindingPhone';
import { BindingPhoneSchema, SendMessageSchema } from '@/v2/services/user/platform/phone/phone.schema';
import { sendMessage } from './sendMessage';

export const phoneRouters = (server: Server): void => {
  server.post('user/bindingPhone', bindingPhone, {
    schema: BindingPhoneSchema,
  });
  server.post('user/bindingPhone/sendMessage', sendMessage, {
    schema: SendMessageSchema,
  });
};
