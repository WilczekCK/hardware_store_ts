import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ChildEntity,
    OneToMany,
    OneToOne,
    Column,
    JoinColumn,
} from "typeorm";
import { User } from ".";
import {Message} from "./message";
  
@Entity()
export class Mailbox {
  @PrimaryGeneratedColumn()
  @OneToMany(() => Message, message => message.mailId)
  id!: number;

  @OneToOne(() => User)
  @JoinColumn()
  userOne!: User;

  @OneToOne(() => User)
  @JoinColumn()
  userTwo!: User;

  @CreateDateColumn()
  createdAt!: Date;
}