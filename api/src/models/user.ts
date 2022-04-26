import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";

import { Auction } from "./auction";
import { Message } from "./message";
  
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  isVerified!: boolean;
  
  @Column({
    type: "text",
  })
  firstName!: string;
  
  @Column({
    type: "text",
    nullable: true,
  })
  lastName!: string;
  
  @Column({
    type: "text",
  })
  email!: string;

  @Column({
    type: "text",
  })
  password!: string;

  @Column({
    type: "text",
    nullable: true,
  })
  verificationCode!: string;

  @OneToMany(() => Auction, auction => auction.user)
  auctions!: Auction[];

  @OneToMany(() => Message, message => message.userFrom)
  messagesInbox!: Message[];

  @OneToMany(() => Message, message => message.userTo)
  messagesOutbox!: Message[];
  
  @CreateDateColumn()
  createdAt!: Date;
  
  @UpdateDateColumn()
  updatedAt!: Date;
}
  