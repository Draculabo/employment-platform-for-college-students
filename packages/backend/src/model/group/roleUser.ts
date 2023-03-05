import { Column, Entity, ManyToMany } from 'typeorm';
import { Content } from '../common';
import { Status } from '@/constants/enums';
import UserModel from '../user/user';

@Entity({
  name: 'role_user',
})
export default class RoleUserModel extends Content {
  @Column()
  user_id: string;
  @Column()
  role_id: string;
}
