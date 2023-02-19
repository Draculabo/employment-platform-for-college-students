import { Entity } from "typeorm";
import { Content } from "../common";
@Entity({
  name: "user_phone"
})
export default class UserPhoneModel extends Content {

}
