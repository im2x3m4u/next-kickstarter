import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user";

@Entity("activity")
export class Activity {
   @PrimaryGeneratedColumn("uuid")
  id_activity: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "id_user" })
  user!: User;

  @Column()
  activity!: string;

  @Column({ nullable: true })
  location!: string;

  @CreateDateColumn()
  created_at!: Date;
}

