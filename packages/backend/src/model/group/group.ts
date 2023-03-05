import { Column, ManyToMany, ManyToOne, Entity } from 'typeorm';
import { Content } from '../common';
import UserModel from '../user/user';
import { GroupStatus, RecommendLevel } from '@/constants/enums';

@Entity({
  name: 'group',
})
export default class GroupModel extends Content {
  @Column()
  group_id: string;
  @Column()
  user_id: string;
  @Column({
    length: 50,
  })
  name: string;
  @Column({
    length: 500,
  })
  introduction: string;
  @Column({
    type: 'enum',
    enum: [GroupStatus.Created, GroupStatus.Finished, GroupStatus.Abandoned],
    default: GroupStatus.Created,
  })
  status: GroupStatus;
  @Column()
  count: number;
  @Column({
    type: 'enum',
    enum: [RecommendLevel.First, RecommendLevel.Second, RecommendLevel.Third],
    default: RecommendLevel.First,
  })
  top_level: RecommendLevel;
}
