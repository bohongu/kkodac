import { Controller, Get, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { KakaoAuthGuard } from './auth/guard/kakao-auth.guard';
import { KakaoStrategy } from './auth/strategy/kakao.strategy';
import { User } from './common/decorator/user.decorator';

@Controller()
export class AppController {
  constructor() {}

  //   @Get()
  //   user(@User() user, @Res() res: Response) {
  //     try {
  //       res.status(HttpStatus.OK).json({
  //         username: user,
  //         // nickname: user.nickname,
  //         // socialfileid: user.socialfileid,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     // return 'a';
  //     // console.log('a');
  //   }
}
