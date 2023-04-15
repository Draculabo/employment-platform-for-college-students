import { Type } from '@sinclair/typebox';
import { Gender } from '@/constants/Project';

export const updateUserInfoSchema = {
  body: Type.Object({
    user_name: Type.Optional(Type.String()),
    gender: Type.Optional(Type.Enum(Gender)),
    age: Type.Optional(Type.Number()),
    job: Type.Optional(Type.String()),
    introduction: Type.Optional(Type.String()),
    school: Type.Optional(Type.String()),
  }),
};

export const updatePasswordSchema = {
  body: Type.Object({
    oldPassword: Type.String(),
    newPassword: Type.String(),
  }),
};
export const updatePhoneSchema = {
  body: Type.Object({
    phone: Type.String(),
  }),
};

export const forgotPasswordSchema = {
  body: Type.Object({
    phone: Type.String(),
    password: Type.String(),
  }),
};
