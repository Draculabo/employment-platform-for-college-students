import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Content } from '../common';
import UniversityModel from './university';
import StudentModel from './student';

@Entity({
  name: 'subject',
})
export default class SubjectModel extends Content {
  subject_id: string;
  @Column({
    length: 50,
  })
  name: string;
  @ManyToOne(() => UniversityModel, (university) => university.university_id)
  university_id: number;
  @ManyToMany(() => StudentModel)
  @JoinTable()
  student_id: string;
}
