import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Res,
  Inject,
  Logger,
  LoggerService,
  HttpStatus,
  Req,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateLocalUserDto } from './dto/create-local-user.dto';
import { AuthService } from './../auth/auth.service';
import { LocalAuthGuard } from './../auth/guard/local-auth.guard';
import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import { User } from '../common/decorator/user.decorator';
import { KakaoAuthGuard } from './../auth/guard/kakao-auth.guard';
import { Response } from 'express';
import { GoogleAuthGuard } from './../auth/guard/google-auth.guard';
import { JwtRefreshGuard } from './../auth/guard/jwt-refresh.guard';

import { FollowDto } from './dto/follow-dto';
import { UpdateUserDto } from './dto/update-user.dto';

const LABEL = 'User';
@Controller('kkodac/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Post('join')
  async localRegister(
    @Body() createLocalUserDto: CreateLocalUserDto,
    @Res() res: Response,
  ) {
    const result = await this.userService.localRegister(createLocalUserDto);

    console.log(result);
    if (result) {
      this.logger.debug(
        {
          message: 'join',
          body: {
            ...createLocalUserDto,
          },
          result: {
            result,
          },
        },
        LABEL,
      );
      res.status(HttpStatus.OK).json({
        ...result,
      });
    } else {
      throw new Error('서버 측 에러');
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@User() user, @Res() res: Response) {
    const accessToken = await this.authService.createAccessToken(user);
    const refreshToken = await this.authService.createRefreshToken(user);

    const result = { accessToken, refreshToken };
    if (result) {
      this.logger.debug(
        {
          message: 'login',
          result: {
            ...result,
          },
        },
        LABEL,
      );
      res.status(HttpStatus.OK).json({
        ...result,
      });
    } else {
      throw new Error('서버 측 에러');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@User() user, @Res() res: Response) {
    const result = await this.userService.findUser(user);
    console.log('result', result);
    if (result) {
      this.logger.debug(
        {
          message: 'profile',
          result: {
            result,
          },
        },
        LABEL,
      );
      res.status(HttpStatus.OK).json({
        result,
      });
    } else {
      throw new Error('서버 측 에러');
    }
  }

  @UseGuards(JwtRefreshGuard)
  @Get('auth/access-token')
  async getAccessToken(@User() user, @Res() res: Response) {
    const result = await this.authService.createAccessToken(user);

    if (result) {
      this.logger.debug(
        {
          message: 'access-token',
          result: {
            result,
          },
        },
        LABEL,
      );
      res.status(HttpStatus.OK).json({
        result,
      });
    } else {
      throw new Error('서버 측 에러');
    }
  }

  @UseGuards(JwtRefreshGuard)
  @Get('auth/refresh-token')
  async reissueRefreshToken(@User() user, @Res() res: Response) {
    const result = await this.authService.reissueRefreshToken(user);
    if (result) {
      this.logger.debug(
        {
          message: 'refresh-token',
          result: {
            result,
          },
        },
        LABEL,
      );
      res.status(HttpStatus.OK).json({
        result,
      });
    } else {
      throw new Error('서버 측 에러');
    }
  }

  @UseGuards(KakaoAuthGuard)
  @Get('auth/kakao')
  async signInWithKakao() {
    return;
  }

  @UseGuards(KakaoAuthGuard)
  @Get('auth/kakao/callback')
  async kakaocallback(@User() user, @Res() res: Response) {
    if (user.type === 'login') {
      const accessToken = await this.authService.createAccessToken(user.user);
      const refreshToken = await this.authService.createRefreshToken(user.user);
      res.cookie('accessToken', accessToken);
      res.cookie('refreshToken', refreshToken);
      res.redirect('http://localhost:3000');
      res.end();
    } else {
      const onceToken = await this.authService.createOnceToken(
        user.type,
        user.kakaoId,
      );
      const socialRegister = await this.userService.socialRegister(user);
      res.cookie('onceToken', onceToken);
      res.redirect('http://localhost:3000');
      res.end();
    }
  }

  @UseGuards(GoogleAuthGuard)
  @Get('auth/google')
  async googleLogin() {
    return;
  }

  @UseGuards(GoogleAuthGuard)
  @Get('auth/google/callback')
  async googlecallback(@User() user, @Res() res: Response): Promise<any> {
    if (user.type === 'login') {
      const accessToken = await this.authService.createAccessToken(user.user);
      const refreshToken = await this.authService.createRefreshToken(user.user);
      res.cookie('accessToken', accessToken);
      res.cookie('refreshToken', refreshToken);
      res.redirect('http://localhost:3000');
      res.end();
    } else {
      const onceToken = await this.authService.createOnceToken(
        user.type,
        user.googleId,
      );
      const socialRegister = await this.userService.socialRegister(user);
      res.cookie('onceToken', onceToken);
      res.redirect('http://localhost:3000');
      res.end();
    }
  }

  @Patch('')
  async patch(
    @Body() updateUserDto: UpdateUserDto,
    @Body('id') id: string,
    @Res() res: Response,
  ) {
    const result = await this.userService.patch(updateUserDto, id);
    if (result) {
      this.logger.debug(
        {
          message: 'update',
          param: { id: id },
        },
        'User',
      );
      res.status(HttpStatus.OK).json('OK');
    } else {
      throw new Error('서버 측 에러');
    }
  }

  @Post('/follow')
  addFollow(@Body() followDto: FollowDto) {
    return this.userService.addFollow(followDto);
  }

  @Delete('/follow')
  deleteFolllow(@Body() followDto: FollowDto) {
    return this.userService.deleteFollow(followDto);
  }

  @Get('/follow')
  getFollowList(
    @Body('userId') userId: string,
    @Body('viewer') viewerId: string,
  ) {
    return this.userService.getFollowList(userId, viewerId);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }
}
