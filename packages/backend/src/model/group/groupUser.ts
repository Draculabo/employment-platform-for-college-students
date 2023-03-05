import { Column, Entity, ManyToMany } from 'typeorm';
import { Content } from '../common';
import { Status } from '@/constants/enums';
import UserModel from '../user/user';

@Entity({
  name: 'group_user',
})
export default class GroupUserModel extends Content {
  @Column()
  group_id: string;
  @Column()
  user_id: string;
}
