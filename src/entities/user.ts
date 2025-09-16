import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import type { UserRole } from "./userRole"; // type-only import untuk TypeScript

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id_user: string;

  @Column()
  nama: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ name: "no_telepon" })
  no_telepon: string;

  @Column({ type: "tinyint", default: 1 })
  is_aktif: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relasi ke UserRole
  @OneToMany(() => require("./userRole").UserRole, (userRole: any) => userRole.user)
  userRoles: UserRole[];

}
