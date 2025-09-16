import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import type { UserRole } from "./userRole"; // type-only import

@Entity("role")
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id_role: string;

  @Column({ unique: true })
  nama_role: string;

  @Column({ type: "tinyint", default: 1 })
  is_aktif: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relasi ke UserRole
  @OneToMany(() => require("./userRole").UserRole, (userRole: any) => userRole.role)
  userRoles: UserRole[];
}
