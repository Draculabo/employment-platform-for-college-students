import { Column, Entity } from 'typeorm';
import { Content } from '../common';
@Entity({
  name: 'user_university',
})
export default class UserUniversityModel extends Content {
  @Column()
  university_id: string;
  @Column()
  user_uuid: string;
}
