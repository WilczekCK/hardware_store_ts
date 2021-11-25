import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ChildEntity,
    OneToMany,
} from "typeorm";

import {User} from "./user";
import {Message} from "./message";
  
@Entity()
export class Mailbox {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Message, message => message.id)
  messages!: Message[];
  
  @CreateDateColumn()
  createdAt!: Date;
}
  
@ChildEntity()
export class Inbox extends Mailbox {

}

@ChildEntity()
export class Outbox extends Mailbox {

}