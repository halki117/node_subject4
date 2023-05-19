import { Controller,Request, Post, UseGuards, Get, Res, Render } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/JwtAuth.guard';

@Controller('post')
export class PostController {

  @UseGuards(JwtAuthGuard)
  @Get('create')
  @Render('post/create')
  createView(@Request() req) {
    console.log(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('posts')
  @Render('post/posts')
  postsView() {}

}
