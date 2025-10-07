import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { Role } from "./role";
import { User } from "./user";

@Entity("user_role")
export class UserRole {
  @PrimaryGeneratedColumn("uuid")
  id_userRole: string;

  @ManyToOne('User', 'userRoles', { onDelete: "CASCADE" })
  @JoinColumn({ name: "id_user" })
  user: User;

  @ManyToOne('Role', 'userRoles', { onDelete: "CASCADE" })
  @JoinColumn({ name: "id_role" })
  role: Role;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}