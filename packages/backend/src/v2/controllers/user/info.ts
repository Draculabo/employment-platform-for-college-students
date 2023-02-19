import { FastifyRequestTypebox } from '@/types/Server';
import { useOnceService } from '@/v2/service-locator';
import { UserInfoService } from '@/v2/services/user/info';
import { successJSON } from '../internal/utils/response-json';

export const userInfo = async (req: FastifyRequestTypebox<{}>) => {
  const result = await new UserInfoService(req.ids, req.DBTransaction, req.userUUID).info();
  return successJSON({
    ...result,
  });
};

export const follow = async (req: FastifyRequestTypebox<{}>) => {
  const result = await new UserInfoService(req.ids, req.DBTransaction, req.userUUID).follow();
  return successJSON({
    ...result,
  });
};
