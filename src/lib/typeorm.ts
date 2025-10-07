// src/lib/typeorm.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/user";
import { Role } from "../entities/role";
import { UserRole } from "../entities/userRole";
import { Activity } from "@/entities/activity";
// import { UserSession } from "@/entities/UserSession";


export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT! || 3306),
  username: process.env.DB_USER!,
  password: process.env.DB_PASS!,
  database: process.env.DB_NAME!,
  synchronize: false,
  logging: false,
  entities: [User, Role, UserRole,Activity],
});

let connectionPromise: Promise<DataSource> | null = null;

export async function getConnection(): Promise<DataSource> {
  if (AppDataSource.isInitialized) {
    return AppDataSource;
  }
  if (connectionPromise) {
    return connectionPromise;
  }
  connectionPromise = AppDataSource.initialize().catch((error) => {
    connectionPromise = null;
    throw error;
  });
  return connectionPromise;
}

