import { Static, Type } from '@sinclair/typebox';
import { FileResourceType } from '../../../model/cloudStorage/Constants';
import { ListFilesAndTotalUsageByUserUUIDReturn } from './info.type';

export const listSchema = Type.Array(
  Type.Object({
    fileUUID: Type.String(),
    createAt: Type.Integer(),
    fileName: Type.String(),
    fileURL: Type.String(),
    fileSize: Type.Integer(),
    resourceType: Type.String({
      enum: [FileResourceType.NormalResources, FileResourceType.Directory],
    }),
    meta: Type.Object({}),
  }),
  {
    additionalProperties: false,
  }
);

export const listFilesAndTotalUsageByUserUUIDSchema = Type.Object(
  {
    totalUsage: Type.Integer(),
    files: listSchema,
    canCreateDirectory: Type.Boolean(),
  },
  {
    additionalProperties: false,
  }
);
