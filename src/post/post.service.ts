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

  async findOne(post_id): Promise<Post> {
    return await this.postRepository.findOneBy({ id: post_id });
  } 

  async create(createPostDTO: CreatePostDTO, loginUserId: number) {

    const user = await this.userRepository.findOneBy({ id: loginUserId });

    const post = new Post();
    post.title = createPostDTO.title;
    post.content = createPostDTO.content;
    post.user = user;

    return this.postRepository.save(post);
  }

  async update(formData: CreatePostDTO, post_id: number) {
    const post = await this.postRepository.findOneBy({ id: post_id });

    post.title = formData.title;
    post.content = formData.content;
    
    return this.postRepository.save(post);
  }

  async delete(post_id: number) {
    return await this.postRepository.delete(post_id);
  }

}
