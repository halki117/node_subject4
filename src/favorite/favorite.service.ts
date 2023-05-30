import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from 'src/entities/favorites.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
  ){}

  async findOne(post_id: number, loginUserId: number): Promise<Favorite> {
    return await this.favoriteRepository.findOne({ where: { postId: post_id, userId: loginUserId } });
  } 
}
