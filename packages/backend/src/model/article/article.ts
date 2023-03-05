import { Content } from '../common';
import { Column, Entity, ManyToOne } from 'typeorm';
import UserModel from '../user/user';
import { ArticleType } from '@/constants/enums';
@Entity({
  name: 'article',
})
export default class ArticleModel extends Content {
  @Column()
  article_id: string;
  @Column()
  title: string;
  @Column()
  content: string;
  @Column()
  user_id: string;
  @Column()
  share_number: number;
  @Column({
    type: 'enum',
    enum: [ArticleType.School_Recruit, ArticleType.Social_Recruit, ArticleType.InterView_Experience, ArticleType.Chat],
    default: ArticleType.Chat,
  })
  article_type: ArticleType;
}
