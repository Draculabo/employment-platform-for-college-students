import { FastifyRequestTypebox, Response } from '@/types/Server';
import { successJSON } from '../internal/utils/response-json';
import { deleteGroupSchema } from '@/v2/services/group/schema';
import GroupService from '@/v2/services/group/group';

export const deleteGroup = async (req: FastifyRequestTypebox<typeof deleteGroupSchema>): Promise<Response> => {
  const result = await new GroupService(req.ids, req.DBTransaction, req.userUUID).deleteGroup({ ...req.body });
  return successJSON({});
};
