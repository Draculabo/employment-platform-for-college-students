import { Column, Entity, ManyToOne } from 'typeorm';
import { Content } from '../common';
import UserModel from './user';
@Entity({
  name: 'student',
})
export default class StudentModel extends Content {
  student_id: string;
  @Column({
    length: 50,
  })
  name: string;
  @Column({
    type: 'datetime',
    precision: 3,
  })
  graduation_time: Date;
  @ManyToOne(() => UserModel, (user) => user.user_uuid)
  user_id: number;
}
