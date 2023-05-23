import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';

import { Post } from './posts.entity';

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @OneToMany(() => Post, (post) => post.user)
  posts?: Post[]

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}