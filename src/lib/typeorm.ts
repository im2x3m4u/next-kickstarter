// lib/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/user';
import { Role } from '../entities/role';
import { UserRole } from '../entities/userRole';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',      // ganti sesuai konfigurasi
  password: '',          // password mysql
  database: 'kickstarter',
  synchronize: false,     // auto generate tabel (hati-hati di production)
  entities: [User, Role, UserRole],
  migrations: [],
});
