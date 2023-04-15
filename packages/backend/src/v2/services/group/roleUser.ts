import { groupUserDAO, roleUserDAO } from '@/v2/dao';
import { EntityManager, InsertResult, UpdateResult } from 'typeorm';

export class RoleUserService {
  constructor(private readonly roleId: string, private readonly userUUID: string) {}

  public removeSelf(t: EntityManager) {
    return roleUserDAO.delete(t, {
      role_id: this.roleId,
      user_id: this.userUUID,
    });
  }
  public insertSelf(t: EntityManager) {
    return roleUserDAO.insert(t, {
      role_id: this.roleId,
      user_id: this.userUUID,
    });
  }
}
