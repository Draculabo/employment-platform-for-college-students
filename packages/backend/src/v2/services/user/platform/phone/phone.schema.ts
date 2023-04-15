import { Type } from '@sinclair/typebox';

export const SendMessageSchema = {
  body: Type.Object({
    phone: Type.String(),
  }),
};
export const BindingPhoneSchema = {
  body: Type.Object({
    phone: Type.String(),
    code: Type.Number(),
  }),
};
