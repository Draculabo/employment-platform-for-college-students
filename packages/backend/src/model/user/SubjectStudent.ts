import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Content } from '../common';
import UniversityModel from './university';
import StudentModel from './student';

@Entity({
  name: 'subject_student',
})
export default class SubjectStudentModel extends Content {
  @Column()
  subject_id: string;
  @Column()
  student_id: string;
}
