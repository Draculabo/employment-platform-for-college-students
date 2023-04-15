import { StorageService } from '@/constants/Config';
import { registerService } from '../service-locator';
import { AliOSSService } from '../services/oss/ali-oss';

export const initService = () => {
  registerService('oss', (ids?: IDS) => {
    if (!ids) {
      throw new Error('oss service need ids');
    }
    switch (StorageService.type) {
      case 'oss': {
        return new AliOSSService(ids);
      }
      default: {
        throw new Error('Unsupported storage service');
      }
    }
  });
};
