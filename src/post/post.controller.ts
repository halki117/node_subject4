import { Controller,Request, Post, UseGuards, Get, Res, Render } from '@nestjs/common';

@Controller('post')
export class PostController {

  @Get('create')
  @Render('post/create')
  createView() {}

  @Get('posts')
  @Render('post/posts')
  postsView() {}

}
