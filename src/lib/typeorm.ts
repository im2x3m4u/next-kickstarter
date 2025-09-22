// src/lib/typeorm.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/user";
import { Role } from "../entities/role";
import { UserRole } from "../entities/userRole";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT!),
  username: process.env.DB_USER!,
  password: process.env.DB_PASS!,
  database: process.env.DB_NAME!,
  synchronize: false,
  logging: false,
  entities: [User, Role, UserRole],
});

