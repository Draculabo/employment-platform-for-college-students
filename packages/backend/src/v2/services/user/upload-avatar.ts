import { createLoggerService, parseError } from '../../../logger';
import { EntityManager } from 'typeorm';
import { GetAvatarInfoByRedisReturn, UserUploadAvatarStartConfig, UserUploadAvatarStartReturn } from './upload-avatar.type';
import { RedisKey } from '../../../utils/Redis';
// import { CloudStorageUploadService } from '../cloud-storage/upload';
import { useOnceService } from '../../service-locator';
import { FError } from '../../../error/ControllerError';
import { UserUpdateService } from './update';
import { UserInfoService } from './info';
import { v4 } from 'uuid';
import RedisService from '../../../service/thirdParty/RedisService';
import { ErrorCode } from '../../../error/ErrorCode';
import { CloudStorageUploadService } from '../cloud-storage/upload';

export class UserUploadAvatarService {
  private readonly logger = createLoggerService<'userUploadAvatar'>({
    serviceName: 'userUploadAvatar',
    ids: this.ids,
  });

  private readonly oss = useOnceService('oss', this.ids);

  public constructor(private readonly ids: IDS, private readonly DBTransaction: EntityManager, private readonly userUUID: string) {}

  public async start(config: UserUploadAvatarStartConfig): Promise<UserUploadAvatarStartReturn> {
    const { fileName, fileSize } = config;
    const fileUUID = v4();

    await RedisService.hmset(
      RedisKey.userAvatarFileInfo(this.userUUID, fileUUID),
      {
        fileName,
      },
      60 * 60
    );

    const ossFilePath = CloudStorageUploadService.generateOSSFilePath(fileName, fileUUID);
    const { policy, signature } = this.oss.policyTemplate(fileName, ossFilePath, fileSize);

    this.logger.debug('user upload avatar start', {
      userUploadAvatar: {
        fileUUID,
        ossFilePath,
        policy,
        signature,
      },
    });

    return {
      fileUUID,
      ossFilePath,
      ossDomain: this.oss.domain,
      policy,
      signature,
    };
  }

  public async finish(fileUUID: string): Promise<void> {
    const { fileName } = await this.getFileInfoByRedis(fileUUID);

    const ossFilePath = CloudStorageUploadService.generateOSSFilePath(fileName, fileUUID);
    await this.oss.assertExists(ossFilePath);

    const complianceImage = useOnceService('complianceImage', this.ids);
    await complianceImage.assertImageNormal(ossFilePath);

    const userInfoSVC = new UserInfoService(this.ids, this.DBTransaction, this.userUUID);
    const { avatar_url: oldAvatarURL } = await userInfoSVC.info();

    const userUpdateSVC = new UserUpdateService(this.ids, this.DBTransaction, this.userUUID);
    await userUpdateSVC.avatarURL(`${this.oss.domain}/${ossFilePath}`);

    if (oldAvatarURL.startsWith(this.oss.domain)) {
      this.oss.remove(oldAvatarURL).catch((error) => {
        this.logger.warn('remove old avatar failed', {
          ...parseError(error),
          userUploadAvatar: {
            fileUUID,
            oldAvatarURL,
          },
        });
      });
    }

    await RedisService.del(RedisKey.userAvatarFileInfo(this.userUUID, fileUUID)).catch((error) => {
      this.logger.warn('remove avatar info failed in redis', {
        ...parseError(error),
        userUploadAvatar: {
          redisKey: RedisKey.userAvatarFileInfo(this.userUUID, fileUUID),
          fileUUID,
        },
      });
    });
  }

  public async getFileInfoByRedis(fileUUID: string): Promise<GetAvatarInfoByRedisReturn> {
    const redisKey = RedisKey.userAvatarFileInfo(this.userUUID, fileUUID);
    const fileInfo = await RedisService.hmget(redisKey, ['fileName']);

    const fileName = fileInfo[0];

    if (!fileName) {
      this.logger.info('not found file in redis', {
        userUploadAvatar: {
          fileUUID,
          fileNameIsEmpty: !fileName,
        },
      });
      throw new FError(ErrorCode.FileNotFound);
    }

    return {
      fileName,
    };
  }
}
