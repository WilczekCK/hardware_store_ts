import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
  
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
  
  @CreateDateColumn()
  createdAt!: Date;
  
  @UpdateDateColumn()
  updatedAt!: Date;
}
  