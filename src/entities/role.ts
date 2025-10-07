import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { UserRole } from "./userRole"; 
import { RolePermission } from "./rolePermission";

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

  @OneToMany('UserRole', 'role')
  userRoles: UserRole[];

  @OneToMany('RolePermission', 'role')
  rolePermissions: RolePermission[];
}