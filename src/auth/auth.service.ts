import { HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ){}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findUser(email);
    if(user && await bcrypt.compare(pass, user.password)) {
      // 分割代入を用いてユーザーオブジェクトからpasswordプロパティを除外、その他のすべてのプロパティをresultに代入
      // 記号「...」はレストパラメータ。オブジェクトや配列の残りの要素が集約される。
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { sub:user.id, username: user.name, email: user.email }
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async logout(res: any) {
    res.clearCookie('jwt');
    res.status(HttpStatus.OK).send();
  }

  async signup(name: string, email: string, pass: string){
    const hashedPassword = await bcrypt.hash(pass, 10);
    const user = await this.userService.create({name, email, password: hashedPassword});
    return this.login(user);
  }

}
