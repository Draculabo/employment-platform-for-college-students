import { UserBaseInfo } from '../user';

export interface IComment {
  children: IComment[];
  content: string;
  created_at: string;
  comment_id: string;
  is_delete: boolean;
  updated_at: string;
  userInfo: UserBaseInfo;
}
