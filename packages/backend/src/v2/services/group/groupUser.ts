import { groupUserDAO } from '@/v2/dao';
import { EntityManager, InsertResult, UpdateResult } from 'typeorm';

export class GroupUserService {
  constructor(private readonly groupId: string, private readonly userUUID: string) {}

  public removeSelf(t: EntityManager) {
    return groupUserDAO.delete(t, {
      group_id: this.groupId,
      user_id: this.userUUID,
    });
  }
  public insertSelf(t: EntityManager) {
    return groupUserDAO.insert(t, {
      group_id: this.groupId,
      user_id: this.userUUID,
    });
  }
}
