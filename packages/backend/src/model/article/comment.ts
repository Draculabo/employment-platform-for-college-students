import { Entity, ManyToOne } from 'typeorm';
import { Content } from '../common';
import UserModel from '../user/user';

@Entity({
  name: 'comment',
})
export default class CommentModel extends Content {
  comment_id: string;
  @ManyToOne(() => UserModel, (user) => user.user_uuid)
  user_id: string;
  content: string;
  // artcle_id:
}
