import { Column, Entity, ManyToOne } from 'typeorm';
import { Content } from '../common';
import UserModel from '../user/user';

@Entity({
  name: 'comment',
})
export default class CommentModel extends Content {
  @Column()
  comment_id: string;
  @Column()
  user_id: string;
  @Column()
  content: string;
}
