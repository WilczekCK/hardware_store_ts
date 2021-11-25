import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    ChildEntity
} from "typeorm";

import {User} from "./user";
import {Message} from "./message";
  
@Entity()
export class Mailbox {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @Column()
  isOpened!: boolean;

  @ManyToOne(() => User, user => user.messagesInbox)
  userTo!: User;

  @ManyToOne(() => User, user => user.messagesOutbox)
  userFrom!: User;
  
  @CreateDateColumn()
  createdAt!: Date;
}
  
@ChildEntity()
export class Inbox extends Mailbox {

}

@ChildEntity()
export class Outbox extends Mailbox {

}