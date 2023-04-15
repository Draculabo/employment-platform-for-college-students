import { FastifyRequestTypebox, Response } from '@/types/Server';
import CommentInfoService from '@/v2/services/comment/comment';
import type { CommentListRequestType, CommentListSchema } from '../../services/comment/get.schema';
import { Type } from '@sinclair/typebox';
import { successJSON } from '../internal/utils/response-json';
import { groupListSchema } from '@/v2/services/group/schema';
import GroupService from '@/v2/services/group/group';

export const groupList = async (req: FastifyRequestTypebox<typeof groupListSchema>): Promise<Response> => {
  const result = await new GroupService(req.ids, req.DBTransaction, req.userUUID).groupList(req.body);
  return successJSON({
    list: result,
  });
};
