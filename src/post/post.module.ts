import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from 'src/entities/posts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';

@Module({
  providers: [PostService],
  imports: [TypeOrmModule.forFeature([Post, User])],
  controllers: [PostController]
})
export class PostModule {}
