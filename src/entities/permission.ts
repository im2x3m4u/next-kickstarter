import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RolePermission } from "./rolePermission";

@Entity("permission")
export class Permission {
  @PrimaryGeneratedColumn("uuid")
  id_permission: string;

  @Column({ unique: true })
  nama_permission: string; // Contoh: "user:create", "role:edit"

  @Column({ type: "text", nullable: true })
  deskripsi: string;

  @OneToMany('RolePermission', 'permission')
  rolePermissions: RolePermission[];
}