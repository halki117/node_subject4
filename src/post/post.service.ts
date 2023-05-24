import { Injectable } from '@nestjs/common';
import { Post } from 'src/entities/posts.entity';
import { User } from 'src/entities/users.entity';
import { Repository, InsertResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDTO } from './post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  async findAll(): Promise<Post[]>  {
    return await this.postRepository.find({ relations: ['user'] });
  }

  async create(createPostDTO: CreatePostDTO, loginUserId: number) {

    const user = await this.userRepository.findOneBy({ id: loginUserId });

    const post = new Post();
    post.title = createPostDTO.title;
    post.content = createPostDTO.content;
    post.user = user;

    return this.postRepository.save(post);
  }

}
