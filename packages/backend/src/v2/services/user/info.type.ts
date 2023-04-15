import { Type } from '@sinclair/typebox';

export const userInfoSchema = {
  querystring: Type.Object({
    user_id: Type.Optional(Type.String()),
  }),
};

export const existInfoSchema = {
  body: Type.Object({
    account: Type.String(),
  }),
};
