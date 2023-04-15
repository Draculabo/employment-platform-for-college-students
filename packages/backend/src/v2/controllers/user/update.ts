import { FastifyRequestTypebox } from '@/types/Server';
import { UserInfoService } from '@/v2/services/user/info';
import { userInfoSchema } from '@/v2/services/user/info.type';
import { failJSON, successJSON } from '../internal/utils/response-json';
import { UserUpdateService } from '@/v2/services/user/update';
import { forgotPasswordSchema, updatePasswordSchema, updateUserInfoSchema } from '@/v2/services/user/update.schema';

export const updateUserInfo = async (req: FastifyRequestTypebox<typeof updateUserInfoSchema>) => {
  debugger;
  await new UserUpdateService(req.ids, req.DBTransaction, req.userUUID).updateInfo(req.body);
  return successJSON({});
};

export const updateUserPassword = async (req: FastifyRequestTypebox<typeof updatePasswordSchema>) => {
  try {
    await new UserUpdateService(req.ids, req.DBTransaction, req.userUUID).updatePassword(req.body);
    return successJSON({});
  } catch (error) {
    if (error instanceof Error) {
      return failJSON({ msg: error.message });
    }
    return failJSON({});
  }
};
export const forgotPassword = async (req: FastifyRequestTypebox<typeof forgotPasswordSchema>) => {
  try {
    const res = await new UserUpdateService(req.ids, req.DBTransaction, req.userUUID).forgotPassword(req.body);
    return successJSON({});
  } catch (error) {
    if (error instanceof Error) {
      return failJSON({ msg: error.message });
    }
    return failJSON({});
  }
};
