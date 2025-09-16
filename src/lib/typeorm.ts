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
  username: 'root',     
  password: '',         
  database: 'kickstarter',
  synchronize: false,   
  entities: [User, Role, UserRole],
  migrations: [],
});
