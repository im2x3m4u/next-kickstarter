// // // src/lib/typeorm.ts
// import "reflect-metadata";
// import { DataSource } from "typeorm";
// import { User } from "../entities/user";
// import { Role } from "../entities/role";
// import { UserRole } from "../entities/userRole";
// import { Activity } from "@/entities/activity";

// import * as fs from "fs"; // <-- Tambahkan import ini
// import * as path from "path"; 
// //import { UserSession } from "@/entities/UserSession";

// import { Permission } from "@/entities/permission";
// import { RolePermission } from "@/entities/rolePermission";


// export const AppDataSource = new DataSource({
//   type: "mysql",
//   host: process.env.DB_HOST!,
//   port: Number(process.env.DB_PORT! || 16903),
//   username: process.env.DB_USER!,
//   password: process.env.DB_PASS!,
//   database: process.env.DB_NAME!,   
//   ssl: {
//     // Baca file ca.pem yang sudah diunduh
//     ca: fs.readFileSync(path.join(process.cwd(), "src/certs/ca.pem")).toString(),
//   },
//   synchronize: false,
//   logging: false,
//   entities: [User, Role, UserRole,Activity, Permission, RolePermission],
// });

// let connectionPromise: Promise<DataSource> | null = null;

// export async function getConnection(): Promise<DataSource> {
//   if (AppDataSource.isInitialized) {
//     return AppDataSource;
//   }
//   if (connectionPromise) {
//     return connectionPromise;
//   }
//   connectionPromise = AppDataSource.initialize().catch((error) => {
//     connectionPromise = null;
//     throw error;
//   });
//   return connectionPromise;
// }

// src/lib/typeorm.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/user";
import { Role } from "../entities/role";
import { UserRole } from "../entities/userRole";
import { Permission } from "@/entities/permission";
import { RolePermission } from "@/entities/rolePermission";
import { Activity } from "@/entities/activity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT!),
  username: process.env.DB_USER!,
  password: process.env.DB_PASS!,
  database: process.env.DB_NAME!,
  synchronize: false,
  logging: false,
  entities: [User, Role, UserRole,Activity, Permission, RolePermission],
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

