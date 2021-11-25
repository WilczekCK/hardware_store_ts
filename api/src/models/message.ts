import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
} from "typeorm";

import {User} from "./user";
  
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
  
  @CreateDateColumn()
  createdAt!: Date;
}
  