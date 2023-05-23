import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from 'src/entities/posts.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [PostService],
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostController]
})
export class PostModule {}
