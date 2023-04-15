import { Server } from '@/utils/RegisterRouter';
import { groupList } from './get';
import { insertGroup } from './insert';
import { deleteGroup } from './delete';
import { deleteGroupSchema, groupListSchema, insertGroupSchema, joinGroupSchema, updateGroupSchema } from '@/v2/services/group/schema';
import { joinGroup, updateGroup } from './update';

export const groupRoutes = (server: Server) => {
  server.post('group/list', groupList, {
    schema: groupListSchema,
  });
  server.post('group/add', insertGroup, {
    schema: insertGroupSchema,
  });
  server.post('group/delete', deleteGroup, {
    schema: deleteGroupSchema,
  });
  server.post('group/update', updateGroup, {
    schema: updateGroupSchema,
  });
  server.post('group/join', joinGroup, {
    schema: joinGroupSchema,
  });
};
