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
  @OneToMany(() => Message, message => message.mailId)
  id!: number;
  
  @CreateDateColumn()
  createdAt!: Date;
}