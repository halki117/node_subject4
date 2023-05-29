import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppDataSource } from './data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PostModule } from './post/post.module';
import { FavoriteModule } from './favorite/favorite.module';
import * as dotenv from 'dotenv'; // .envの変数を使うため

dotenv.config();

@Module({
  
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60m' }, // トークンの有効期間を設定します
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
    AuthModule,
    UserModule,
    PostModule,
    FavoriteModule],
  controllers: [AppController, AuthController],
  providers: [AppService],

})
export class AppModule {}
