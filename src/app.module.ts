import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppDataSource } from './data-source'; // 追加
import { TypeOrmModule } from '@nestjs/typeorm'; // 追加
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options), AuthModule, UserModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, UserService],
})
export class AppModule {}
