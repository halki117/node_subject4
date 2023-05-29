import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable
} from 'typeorm';

import { Post } from './posts.entity';
import { Favorite } from './favorites.entity';

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @OneToMany(() => Post, (post) => post.user)
  posts?: Post[];

  @OneToMany(() => Favorite, (favorite) => favorite.user, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  favorites?: Favorite[];

  @ManyToMany(() => Post, (post) => post.favoritedByUsers, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinTable({
    name: 'favorites',
    joinColumn: { name: 'user_id', referencedColumnName: 'id'},
    inverseJoinColumn: { name: 'post_id', referencedColumnName: 'id'},
  })
  favoritedPosts?: Post[];

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