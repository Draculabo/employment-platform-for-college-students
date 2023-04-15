import { Status } from '@/constants/Project';
import { FError } from '@/error/ControllerError';
import { ErrorCode } from '@/error/ErrorCode';
import RedisService from '@/service/thirdParty/RedisService';
import { FastifyRequestTypebox } from '@/types/Server';
import { RedisKey } from '@/utils/Redis';
import { SMSUtils } from '@/utils/SMS';
import { failJSON, successJSON } from '@/v2/controllers/internal/utils/response-json';
import { userDAO } from '@/v2/dao';
import SendMessageService from '@/v2/services/login/phone/sendMessage';
import { PhoneService } from '@/v2/services/user/platform/phone/PhoneService';
import { BindingPhoneSchema } from '@/v2/services/user/platform/phone/phone.schema';

const ExhaustiveAttackCount = 10;
export const bindingPhone = async (req: FastifyRequestTypebox<typeof BindingPhoneSchema>) => {
  debugger;
  const { phone, code } = req.body;
  const safePhone = SMSUtils.safePhone(phone);
  const svc = new PhoneService(req.ids, req.DBTransaction, req.userUUID);
  await notExhaustiveAttack(safePhone);

  // if (await svc.exist()) {
  //   throw new FError(ErrorCode.SMSAlreadyExist);
  // }

  if (await svc.existPhone(phone)) {
    throw new FError(ErrorCode.SMSAlreadyBinding);
  }

  await assertCodeCorrect(safePhone, code);
  await clearTryBindingCount(safePhone);

  // const userInfo = await userDAO.findOne(req.DBTransaction, ['user_name'], {
  //   user_uuid: req.userUUID,
  // });

  // if (userInfo === undefined) {
  //   return failJSON({
  //     code: ErrorCode.UserNotFound,
  //   });
  // }

  await svc.create({
    phone,
  });

  await clearVerificationCode(safePhone);
  return successJSON({});
};

async function assertCodeCorrect(safePhone: string, code: number) {
  const value = await RedisService.get(RedisKey.phoneBinding(safePhone));

  if (String(code) !== value) {
    throw new FError(ErrorCode.SMSVerificationCodeInvalid);
  }
}

async function notExhaustiveAttack(safePhone: string): Promise<void> {
  const key = RedisKey.phoneTryBindingCount(safePhone);
  const value = Number(await RedisService.get(key)) || 0;

  if (value > ExhaustiveAttackCount) {
    throw new FError(ErrorCode.ExhaustiveAttack);
  }

  const inrcValue = await RedisService.incr(key);

  if (inrcValue === 1) {
    // must re-wait 10 minute
    await RedisService.expire(key, 60 * 10);
  }
}

async function clearTryBindingCount(safePhone: string): Promise<void> {
  await RedisService.del(RedisKey.phoneTryBindingCount(safePhone));
}

async function clearVerificationCode(safePhone: string): Promise<void> {
  await RedisService.del(RedisKey.phoneBinding(safePhone));
}
