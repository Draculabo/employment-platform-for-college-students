import { Column, Entity, ManyToMany } from 'typeorm';
import { Content } from '../common';
import { Status } from '@/constants/enums';
import UserModel from '../user/user';

@Entity({
  name: 'role',
})
export default class RoleModel extends Content {
  @Column()
  role_id: string;
  @Column()
  name: string;
  @Column({
    type: 'enum',
    enum: [Status.Open, Status.Close],
    default: Status.Open,
  })
  status: Status;
  @Column()
  remark: string;
}
