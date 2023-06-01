import { Controller, Get, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('index')
  @Render('index')
  root() {
    return { message: 'get index page!' };
  }

  // @Get('index')
  // root(@Res() res: Response) {
  //   return res.render('index', {
  //     message: 'index page!!!!!',
  //   });
  // }

}
