import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';

@Injectable()
export class UserService {
  constructor(
    // TypeORMのRepositoryを注入す。引数にはEntityクラス（この場合はUser）を指定。
    @InjectRepository(User)
    private userRepository: Repository<User> 
  ){}

  // メールアドレスに一致するユーザーをデータベースから検索して返す。ユーザーが存在しない場合はundefined返す。
  async findUser(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: {email} });
  }
  
  // User Entityを引数に取り、そのユーザーをデータベースに保存するメソッド。保存したユーザーの情報を返す。
  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
