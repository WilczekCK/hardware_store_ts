import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
} from "typeorm";

import { User } from "./user";
  
@Entity()
export class Auction {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column({
    type: "text",
  })
  brand!: string;

  @Column({
    type: "text",
  })
  series!: string;

  @Column({
    type: "text",
  })
  description!: string;

  @Column()
  isActive!:boolean;
  
  @Column()
  price!: number;

  @ManyToOne(() => User, user => user.auctions)
  user!: User;
  
  @CreateDateColumn()
  createdAt!: Date;
  
  @UpdateDateColumn()
  updatedAt!: Date;
}
  