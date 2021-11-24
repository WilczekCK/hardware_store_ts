import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";

import { Auction } from "./auction";
  
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column({
    type: "text",
  })
  firstName!: string;
  
  @Column({
    type: "text",
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

  @OneToMany(() => Auction, auction => auction.user)
  auctions!: Auction[];
  
  @CreateDateColumn()
  createdAt!: Date;
  
  @UpdateDateColumn()
  updatedAt!: Date;
}
  