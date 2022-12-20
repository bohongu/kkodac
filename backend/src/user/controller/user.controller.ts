import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  UseInterceptors,
  Inject,
  Logger,
  LoggerService,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from '../service/user.service';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

const LABEL = 'User';

@Controller('/kkodac')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor(''))
  async create(
    @Body()
    createUserDto: CreateUserDto,
    @Req()
    req: Request,
    @Res() res: Response,
  ) {
    console.log(createUserDto);
    const result = await this.userService.create(createUserDto, req);
    if (result) {
      this.logger.debug(
        {
          message: 'create',
          body: {
            ...createUserDto,
          },
          result: {
            ...result,
          },
        },
        LABEL,
      );
      res.status(HttpStatus.OK).json('OK');
    } else {
      throw new Error('서버 측 에러');
    }
  }
}
