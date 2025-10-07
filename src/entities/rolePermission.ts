import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Role } from "./role";
import { Permission } from "./permission";

@Entity("role_permission")
export class RolePermission {
  @PrimaryGeneratedColumn("uuid")
  id_role_permission: string;

  @ManyToOne('Role', 'rolePermissions', { onDelete: "CASCADE" })
  @JoinColumn({ name: "id_role" })
  role: Role;

  @ManyToOne('Permission', 'rolePermissions', { onDelete: "CASCADE" })
  @JoinColumn({ name: "id_permission" })
  permission: Permission;
}