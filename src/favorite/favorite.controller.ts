import { Controller,Request, Post, UseGuards, Get, Res, Render, Body, Put, Delete , Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/JwtAuth.guard';
import { Response } from 'express';
import { FavoriteService } from './favorite.service';


@Controller('favorite')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService){}

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async favorite(@Request() req, @Param('id') post_id: string){
    const loginUserId = req.user ? req.user.userId : null;
    const result =  await this.favoriteService.favorite(loginUserId, parseInt(post_id));
    return { result: result };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async unfavorite(@Request() req, @Param('id') post_id: string){
    const loginUserId = req.user ? req.user.userId : null;
    const result = this.favoriteService.unfavorite(loginUserId, parseInt(post_id));
    return { result: result };
  }
}
