import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppDataSource } from './data-source'; // 追加
import { TypeOrmModule } from '@nestjs/typeorm'; // 追加
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options)],
  controllers: [AppController],
  providers: [AppService, AuthService, UserService],
})
export class AppModule {}
