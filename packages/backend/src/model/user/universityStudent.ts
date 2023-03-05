import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Content } from '../common';
import StudentModel from './student';
@Entity({
  name: 'university_student',
})
export default class UniversityStudentModel extends Content {
  @Column()
  university_id: string;
  @Column()
  student_id: string;
}
