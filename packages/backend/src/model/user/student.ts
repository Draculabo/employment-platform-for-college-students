import { Column, Entity, ManyToOne } from 'typeorm';
import { Content } from '../common';
import UserModel from './user';
@Entity({
  name: 'student',
})
export default class StudentModel extends Content {
  @Column()
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
  @Column()
  user_id: string;
}
