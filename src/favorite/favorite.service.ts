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

  async favorite(user_id: number, post_id: number){
    const favorite = new Favorite();
    favorite.userId = user_id;
    favorite.postId = post_id;
    return this.favoriteRepository.save(favorite);
  }
}
