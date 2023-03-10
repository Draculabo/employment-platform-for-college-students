import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Content } from '../common';
import UniversityModel from './university';
import StudentModel from './student';

@Entity({
  name: 'subject',
})
export default class SubjectModel extends Content {
  @Column()
  subject_id: string;
  @Column({
    length: 50,
  })
  name: string;
  @Column()
  university_id: string;
  @Column()
  student_id: string;
}
