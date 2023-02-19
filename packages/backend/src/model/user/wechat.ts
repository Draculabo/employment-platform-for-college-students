import { Entity } from 'typeorm';
import { Content } from '../common';
@Entity({
  name: 'user_wechat',
})
export default class WechatUserModel extends Content {}
