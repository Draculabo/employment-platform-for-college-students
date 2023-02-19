import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Content } from '../common';
import StudentModel from './student';
@Entity({
  name: 'university',
})
export default class UniversityModel extends Content {
  university_id: string;
  @Column({
    length: 50,
  })
  name: string;
  @ManyToMany(() => StudentModel)
  @JoinTable()
  students: StudentModel[];
}
