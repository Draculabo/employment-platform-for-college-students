import { FilePayload } from '@/model/cloudStorage/Types';
import { FileResourceType } from '../../../../../model/cloudStorage/Constants';

export const filePayloadParse = (resourceType: FileResourceType, payload: FilePayload): FilePayloadParse => {
  switch (resourceType) {
    case FileResourceType.Directory:
    case FileResourceType.NormalResources: {
      return {};
    }
    default: {
      return {};
    }
  }
};

export type FilePayloadParse = {};
