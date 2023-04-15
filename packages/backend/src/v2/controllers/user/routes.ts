import { userRename, userRenameSchema } from './rename';
import { userUploadAvatarStart, userUploadAvatarStartSchema } from './upload-avatar/start';
import { userUploadAvatarFinish, userUploadAvatarFinishSchema } from './upload-avatar/finish';
import { Server } from '../../../utils/RegisterRouter';
import { follow, userInfo } from './info';
import { userInfoSchema } from '@/v2/services/user/info.type';
import { forgotPassword, updateUserInfo, updateUserPassword } from './update';
import { forgotPasswordSchema, updatePasswordSchema, updateUserInfoSchema } from '@/v2/services/user/update.schema';

export const userRouters = (server: Server): void => {
  server.post('user/rename', userRename, {
    schema: userRenameSchema,
  });

  server.post('user/upload-avatar/start', userUploadAvatarStart, {
    schema: userUploadAvatarStartSchema,
  });
  server.post('user/upload-avatar/finish', userUploadAvatarFinish, {
    schema: userUploadAvatarFinishSchema,
  });
  server.get('user/info', userInfo, {
    schema: userInfoSchema,
  });
  server.get('user/follow', follow, {
    schema: {},
  });
  server.post('user/update', updateUserInfo, {
    schema: updateUserInfoSchema,
  });
  server.post('user/update-password', updateUserPassword, {
    schema: updatePasswordSchema,
  });
  server.post('user/reset-password', forgotPassword, {
    schema: forgotPasswordSchema,
  });
};
