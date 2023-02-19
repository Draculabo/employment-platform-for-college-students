import { userRename, userRenameSchema } from './rename';
import { userUploadAvatarStart, userUploadAvatarStartSchema } from './upload-avatar/start';
import { userUploadAvatarFinish, userUploadAvatarFinishSchema } from './upload-avatar/finish';
import { Server } from '../../../utils/RegisterRouter';
import { follow, userInfo } from './info';

export const userRouters = (server: Server): void => {
  server.post('user/rename', userRename, {
    schema: userRenameSchema,
  });

  server.post('user/upload-avatar/start', userUploadAvatarStart, {
    schema: userUploadAvatarStartSchema,
  });
  // 有bug
  // server.post('user/upload-avatar/finish', userUploadAvatarFinish, {
  //   schema: userUploadAvatarFinishSchema,
  // });
  server.get('user/info', userInfo, {
    schema: {},
  });
  server.get('user/follow', follow, {
    schema: {},
  });
};
