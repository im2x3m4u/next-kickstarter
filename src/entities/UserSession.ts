// // entities/UserSession.ts
// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
// import { User } from "./user";

// @Entity("user_sessions")
// export class UserSession {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => User, (user) => user.sessions, { onDelete: "CASCADE" })
//   user: User;

//   @Column({ unique: true })
//   token: string;

//   @CreateDateColumn()
//   created_at: Date;
// }
// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   CreateDateColumn,
//   JoinColumn,
// } from "typeorm";
// import { User } from "./user";

// @Entity("user_sessions")
// export class UserSession {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => User, (user) => user.sessions, { onDelete: "CASCADE" })
//   @JoinColumn({ name: "user_id" })
//   user: User;

//   @Column({ unique: true })
//   token: string;

//   @CreateDateColumn()
//   created_at: Date;
// }
