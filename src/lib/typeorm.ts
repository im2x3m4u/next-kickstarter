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
  logging: false, // Disable logging untuk performa
  entities: [User, Role, UserRole],
  // Connection pooling untuk performa lebih baik
  extra: {
    connectionLimit: 10,
    acquireTimeout: 60000,
    timeout: 60000,
  },
});

// Global connection promise untuk menghindari multiple initialization
let connectionPromise: Promise<DataSource> | null = null;

export async function getConnection(): Promise<DataSource> {
  if (!connectionPromise) {
    connectionPromise = AppDataSource.initialize().catch((error) => {
      console.error('Database connection failed:', error);
      connectionPromise = null; // Reset promise so we can retry
      throw new Error(`Database connection failed: ${error.message}`);
    });
  }
  return connectionPromise;
}

