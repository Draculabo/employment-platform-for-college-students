import { Column, Entity } from 'typeorm';
import { Content } from '../common';
import { ReadStatus } from '@/constants/enums';

@Entity({
  name: 'message',
})
export default class MessageModel extends Content {
  @Column()
  message_id: string;
  @Column({
    length: 40,
  })
  user_id: string;
  @Column({
    length: 40,
  })
  receive_id: string;
  @Column({
    length: 500,
  })
  content: string;
  @Column({
    type: 'enum',
    enum: [ReadStatus.Read, ReadStatus.UnRead],
    default: ReadStatus.UnRead,
  })
  read_status: ReadStatus;
}
