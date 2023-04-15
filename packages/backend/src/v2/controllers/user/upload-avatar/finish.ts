import { Type } from '@sinclair/typebox';
import { FastifyRequestTypebox, Response } from '../../../../types/Server';
import { UserUploadAvatarService } from '../../../services/user/upload-avatar';
import { successJSON } from '../../internal/utils/response-json';
import { FastifyReply } from 'fastify';
import { UserInfoService } from '@/v2/services/user/info';
import { flatMapDepth } from 'lodash';

export const userUploadAvatarFinishSchema = {
  body: Type.Object({
    fileUUID: Type.String({
      format: 'uuid-v4',
    }),
  }),
};
//@ts-ignore
export const userUploadAvatarFinish = async (
  req: FastifyRequestTypebox<typeof userUploadAvatarFinishSchema>,
  res: FastifyReply
): Promise<Response> => {
  debugger;
  const userUploadAvatarSVC = new UserUploadAvatarService(req.ids, req.DBTransaction, req.userUUID);

  await userUploadAvatarSVC.finish(req.body.fileUUID);
  const baseInfo = await new UserInfoService(req.ids, req.DBTransaction, req.userUUID).baseInfo();
  return successJSON({
    token: await res.jwtSign({
      ...baseInfo,
      userUUID: req.userUUID,
    }),
  });
};
flatMapDepth([]);
