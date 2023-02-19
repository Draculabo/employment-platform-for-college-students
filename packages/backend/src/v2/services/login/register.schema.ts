import { Static, Type } from '@sinclair/typebox';

export const registerSchema = {
  body: Type.Object({
    account: Type.String(),
    password: Type.String(),
  }),
};
export type RegisterSchemaType = Static<typeof registerSchema.body>;
