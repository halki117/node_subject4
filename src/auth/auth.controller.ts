import { Controller, Request, Post, UseGuards, Get, Res, Render  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './LocalAuth.guard';
import { JwtAuthGuard } from './JwtAuth.guard';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}
  
  @Get('login')
  @Render('auth/login')
  loginView() {}
  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('logout')
  logout(@Res() res: Response) {
    // res.clearCookie('jwt');
    // res.status(HttpStatus.OK).send();
    return this.authService.logout(res);
  }

  @Get('signup')
  @Render('auth/signup')
  signupView() {}

  @Post('signup')
  async signUp(@Request() req) {
    return this.authService.signup(req.body.name, req.body.email, req.body.password,);
  }
}