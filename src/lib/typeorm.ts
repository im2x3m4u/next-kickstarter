// src/lib/typeorm.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/user";
import { Role } from "../entities/role";
import { UserRole } from "../entities/userRole";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "kickstarter",
  synchronize: false,
  logging: true,
  entities: [User, Role, UserRole],
});

