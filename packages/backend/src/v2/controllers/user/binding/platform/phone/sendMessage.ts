import { Status } from '@/constants/Project';
import { FError } from '@/error/ControllerError';
import { ErrorCode } from '@/error/ErrorCode';
import RedisService from '@/service/thirdParty/RedisService';
import { FastifyRequestTypebox } from '@/types/Server';
import { RedisKey } from '@/utils/Redis';
import { SMS, SMSUtils } from '@/utils/SMS';
import { successJSON } from '@/v2/controllers/internal/utils/response-json';
import { MessageExpirationSecond, MessageIntervalSecond } from '@/v2/controllers/user/binding/platform/phone/Constants';
import { PhoneService } from '@/v2/services/user/platform/phone/PhoneService';
import { SendMessageSchema } from '@/v2/services/user/platform/phone/phone.schema';
import { updatePhoneSchema } from '@/v2/services/user/update.schema';

export const sendMessage = async (req: FastifyRequestTypebox<typeof SendMessageSchema>) => {
  debugger;
  const { phone } = req.body;
  const sms = new SMS(phone);
  const svc = new PhoneService(req.ids, req.DBTransaction, req.userUUID);
  const safePhone = SMSUtils.safePhone(phone);

  if (await canSend(safePhone)) {
    if (await svc.existPhone(phone)) {
      throw new FError(ErrorCode.SMSAlreadyBinding);
    }

    await sms.send();
    await RedisService.set(RedisKey.phoneBinding(safePhone), sms.verificationCode, MessageExpirationSecond);
  }
  return successJSON({});
};
async function canSend(phone: string): Promise<boolean> {
  const ttl = await RedisService.ttl(RedisKey.phoneBinding(phone));

  if (ttl < 0) {
    return true;
  }

  const elapsedTime = MessageExpirationSecond - ttl;

  return elapsedTime > MessageIntervalSecond;
}
