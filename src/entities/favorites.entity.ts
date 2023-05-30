import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';

import { User } from "./users.entity";
import { Post } from "./posts.entity";

@Entity({name: 'favorites'})
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @PrimaryColumn({ name: 'post_id' })
  postId: number;

  @ManyToOne(() => User, (user) => user.favorites, { onDelete: 'CASCADE' })
  @JoinColumn({name: 'user_id'})
  user: User;

  @ManyToOne(() => Post, (post) => post.favorites, { onDelete: 'CASCADE' })
  @JoinColumn({name: 'post_id'})
  post: Post;

}