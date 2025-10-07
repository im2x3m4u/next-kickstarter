import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import type { UserRole } from "./userRole";
// import { UserSession } from "./UserSession";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id_user: string;

  @Column()
  nama: string;

  @Column({ unique: true })
  username: string;

  @Column({ type: "text" })
  password: string;

  @Column()
  email: string;

  @Column({ name: "no_telepon" })
  no_telepon: string;

  @Column({ type: "tinyint", default: 1 })
  is_aktif: number;

  @Column({ type: "text", nullable: true })
  reset_token: string | null;
  
  @Column({ type: "text", nullable: true })
  login_token: string | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relasi ke UserRole
  @OneToMany(() => require("./userRole").UserRole, (userRole: any) => userRole.user)
  userRoles: UserRole[];

  // entities/user.ts
//  @OneToMany(() => require("./UserSession").UserSession, (session: any) => session.user)
//   sessions: any[];


}
