import { Controller,Request, Post, UseGuards, Get, Res, Render } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/JwtAuth.guard';

@Controller('post')
export class PostController {

  @UseGuards(JwtAuthGuard)
  @Get('create')
  @Render('post/create')
  createView(@Request() req) {
    const loginUser = req.user ? req.user.username : null;
    return {loginUser: loginUser};
  }

  @UseGuards(JwtAuthGuard)
  @Get('posts')
  @Render('post/posts')
  postsView(@Request() req) {
    const loginUser = req.user ? req.user.username : null;
    return {loginUser: loginUser};
  }

}
