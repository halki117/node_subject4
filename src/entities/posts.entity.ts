import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { User } from "./users.entity";
import { Favorite } from './favorites.entity';

@Entity({name: 'posts'})
export class Post {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => Favorite, (favorite) => favorite.post, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  favorites?: Favorite[];

  @ManyToMany(() => User, (user) => user.favoritedPosts, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinTable({
    name: 'favorites',
    joinColumn: { name: 'post_id', referencedColumnName: 'id'},
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id'},
  })
  favoritedByUsers?: User[];

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  content: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}