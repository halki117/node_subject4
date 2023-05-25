import { Controller,Request, Post, UseGuards, Get, Res, Render, Body, Put, Delete , Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/JwtAuth.guard';
import { PostService } from './post.service';
import { CreatePostDTO } from './post.dto';
import { Response } from 'express';

@Controller('post')
export class PostController {
  constructor(private postService: PostService){}

  @UseGuards(JwtAuthGuard)
  @Get('create')
  @Render('post/create')
  createView(@Request() req) {
    const loginUser = req.user ? req.user.username : null;
    return {loginUser: loginUser};
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @Request() req,
    @Res() res: Response,
    @Body() post: CreatePostDTO,
  ) {
    const loginUserId = req.user ? req.user.userId : null;
    await this.postService.create(post, loginUserId);
    res.redirect('/post/posts');
  }

  @UseGuards(JwtAuthGuard)
  @Get('posts')
  @Render('post/posts')
  async postsView(@Request() req) {
    const posts = await this.postService.findAll();
    const loginUser = req.user ? req.user.username : null;
    const loginUserId = req.user ? req.user.userId : null;
    return {
      loginUserId: loginUserId,
      loginUser: loginUser,
      posts: posts
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('edit/:id')
  @Render('post/edit')
  async edit(@Request() req, @Param('id') post_id: string) {
    const post = await this.postService.findOne(post_id);
    const loginUser = req.user ? req.user.username : null;
    return {
      loginUser: loginUser,
      post: post
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async update(@Param('id') post_id: string, @Body() formData: CreatePostDTO,) {
    const post = await this.postService.update(formData, parseInt(post_id));
    return { 
      message: "updated!!",
      updateTarget: post
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  async delete(@Param('id') post_id: string){
    const post = await this.postService.delete(parseInt(post_id));
    return { 
      message: "deleted!!",
      deleteTarget: post
    };
  }

}
