import { Static, Type } from '@sinclair/typebox';
import { FastifyRequestTypebox, Response } from '../../../../types/Server';
import { successJSON } from '../../internal/utils/response-json';

export const cloudStorageConvertStartSchema = {
  body: Type.Object(
    {
      fileUUID: Type.String({
        format: 'uuid-v4',
      }),
    },
    {
      additionalProperties: false,
    }
  ),
};

export const cloudStorageConvertStart = async (req: FastifyRequestTypebox<typeof cloudStorageConvertStartSchema>) => {
  return successJSON({});
};
