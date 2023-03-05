import { Column, Entity } from 'typeorm';
import { Content } from '../common';
import { Article_Comment_Operator } from '../../constants/enums';
@Entity({
  name: 'article_comment_operator',
})
export default class ArticleCommentOperatorModel extends Content {
  @Column()
  user_id: string;
  @Column()
  article_id: string;
  @Column({
    type: 'enum',

    enum: [Article_Comment_Operator.Collect, Article_Comment_Operator.Like],
  })
  operationType: Article_Comment_Operator;
}
