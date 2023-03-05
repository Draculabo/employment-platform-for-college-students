import { Column, Entity, Index, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Content } from '../common';
import UniversityModel from './university';

const enum Gender {
  Man = 'Man',
  Woman = 'Woman',
  None = 'None',
}
@Entity({
  name: 'users',
})
export default class UserModel extends Content {
  @Index('users_user_uuid_uindex', {
    unique: true,
  })
  @Column({
    length: 40,
  })
  user_uuid: string;

  @Column({
    length: 50,
  })
  user_name: string;
  @Column({
    length: 40,
  })
  account: string;
  @Column({
    precision: 32,
  })
  user_password: string;

  @Column({
    length: 2083,
  })
  avatar_url: string;

  @Column({
    type: 'enum',
    enum: [Gender.Man, Gender.Woman, Gender.None],
    default: Gender.None,
  })
  gender: Gender;
  @Column({
    default: false,
  })
  age: number;
  @Column({
    nullable: true,
  })
  job: string;
  @Column({
    length: 50,
  })
  phone: string;
  @Column()
  work_city: string;
  @OneToMany(() => UserModel, (user) => user.user_uuid)
  followings: UserModel[];
  @OneToMany(() => UserModel, (user) => user.user_uuid)
  followers: UserModel[];
  @Index('users_is_delete_index')
  @Column({
    default: false,
  })
  is_delete: boolean;
}
