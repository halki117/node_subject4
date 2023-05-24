import { Injectable } from '@nestjs/common';
import { Post } from 'src/entities/posts.entity';
import { Repository, InsertResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDTO } from './post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>
  ){}

  async findAll(): Promise<Post[]>  {
    return await this.postRepository.find();
  }

  async create(Post: CreatePostDTO, loginUserId: number) {
    console.log(Post, loginUserId);
    return await this.postRepository.save({
      title: Post.title,
      content: Post.content,
      userId: loginUserId
    });
  }

}
