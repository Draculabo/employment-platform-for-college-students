import { Static, Type } from '@sinclair/typebox';

export const LoginSchema = {
  body: Type.Object({
    account: Type.String(),
    password: Type.String(),
  }),
};
export type LoginRequestType = Static<typeof LoginSchema.body>;

export const LoginPhoneSchema = {
  body: Type.Object({
    phone: Type.String(),
  }),
};
