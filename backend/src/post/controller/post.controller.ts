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
} from '@nestjs/common';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostService } from '../service/post.service';

const LABEL = 'Post';

@Controller('/kkodac/post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor(''))
  async create(
    @Body()
    createPostDto: CreatePostDto,
    @Req()
    req: Request,
    @Res() res: Response,
  ) {
    const result = await this.postService.create(createPostDto, req);
    if (result) {
      this.logger.debug(
        {
          message: 'create',
          body: {
            ...createPostDto,
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

  @Get('/a')
  async find(
    @Req()
    req: Request,
    @Res() res: Response,
  ) {
    const result = 'hello';

    return result;
  }
}
