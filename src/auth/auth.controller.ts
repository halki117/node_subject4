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
  loginView(@Request() req) {
    const loginUser = req.user ? req.user.username : null;
    return {loginUser: loginUser};
  }
  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    const jwt = await this.authService.login(req.user);
    console.log(jwt);
    res.cookie('jwt', jwt.access_token, { httpOnly: true });
    console.log('Logged in successfully!');
    res.redirect('/post');
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Res() res: Response) {
    this.authService.logout(res);
  }

  @Get('signup')
  @Render('auth/signup')
  signupView(@Request() req) {
    const loginUser = req.user ? req.user.username : null;
    return {loginUser: loginUser};
  }

  @Post('signup')
  async signUp(@Request() req, @Res() res: Response) {
    const jwt = await this.authService.signup(req.body.name, req.body.email, req.body.password,);
    console.log(jwt);
    res.cookie('jwt', jwt.access_token, { httpOnly: true });
    console.log('Signup successfully!');
    res.redirect('/post');
  }
}