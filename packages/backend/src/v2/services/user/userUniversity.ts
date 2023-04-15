import { groupUserDAO, roleUserDAO, userUniversityDAO } from '@/v2/dao';
import { EntityManager, InsertResult, UpdateResult } from 'typeorm';

export class UserUniversityService {
  constructor(private readonly universityId: string, private readonly userUUID: string) {}

  public removeSelf(t: EntityManager) {
    return userUniversityDAO.delete(t, {
      university_id: this.universityId,
      user_uuid: this.userUUID,
    });
  }
  public insertSelf(t: EntityManager) {
    return userUniversityDAO.insert(t, {
      university_id: this.universityId,
      user_id: this.userUUID,
    });
  }
}
