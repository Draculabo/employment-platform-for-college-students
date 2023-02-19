import { Column, Entity, ManyToOne } from 'typeorm';
import { Content } from '../common';
import UserModel from '../user/user';
import ArticleModel from './article';
import { Article_Comment_Operator } from '../../constants/enums';
@Entity({
  name: 'article_comment_operator',
})
export default class ArticleCommentOperatorModel extends Content {
  @ManyToOne(() => UserModel, (user) => user.user_uuid)
  user_id: number;
  @ManyToOne(() => ArticleModel, (article) => article.article_id)
  article_id: number;
  @Column({
    type: 'enum',

    enum: [Article_Comment_Operator.Collect, Article_Comment_Operator.Like],
  })
  operationType: Article_Comment_Operator;
}
