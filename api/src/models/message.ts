import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne
} from "typeorm";

import {User} from "./user";
import {Mailbox} from "./mailbox";
  
@Entity()
export class Message {
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

  @ManyToOne(() => Mailbox, mailbox => mailbox.id)
  mailId!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
  