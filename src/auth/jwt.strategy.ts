import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv'; // .envの変数を使うため

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Authorization bearerからトークンを読み込む関数を返す
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 有効期間を無視するかどうか
      ignoreExpiration: false,
      // .envファイルからシークレットキーを渡す
      secretOrKey: process.env.JWT_SECRET_KEY
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}