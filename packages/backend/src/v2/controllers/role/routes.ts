import { Server } from '@/utils/RegisterRouter';
import { roleList } from './get';
import { insertRole } from './insert';
import { deleteRole } from './delete';
import { deleteGroupSchema, groupListSchema, insertGroupSchema, updateGroupSchema } from '@/v2/services/group/schema';
import { updateRole } from './update';
import { deleteRoleSchema, insertRoleSchema, roleListSchema, updateRoleSchema } from '@/v2/services/role/schema';

export const roleRoutes = (server: Server) => {
  server.post('role/list', roleList, {
    schema: roleListSchema,
  });
  server.post('role/add', insertRole, {
    schema: insertRoleSchema,
  });
  server.post('role/delete', deleteRole, {
    schema: deleteRoleSchema,
  });
  server.post('role/update', updateRole, {
    schema: updateRoleSchema,
  });
};
