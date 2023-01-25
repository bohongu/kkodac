import {
  Controller,
  Get,
  Inject,
  Logger,
  LoggerService,
  Query,
  Res,
} from '@nestjs/common';
import { PostService } from '../service/post.service';
import { Response } from 'express';

@Controller('kkodac/posts')
export class PostsController {
  constructor(
    private readonly postService: PostService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Get('')
  async findAll(
    @Query('region') region: string,
    @Query('tag') tag: string,
    @Res() res: Response,
  ) {
    const result = await this.postService.findAll(region, tag);
    if (result !== null) {
      this.logger.debug(
        {
          message: 'findAll',
          query: {
            searchWord: { tag, region },
          },
          result: result,
        },
        'Get',
      );
      res.status(200).json({
        result,
      });
    } else {
      throw new Error('서버 측 에러');
    }
  }

  @Get('/tag')
  async findTagAll(@Query('tag') tag: string, @Res() res: Response) {
    const result = await this.postService.findTagAll(tag);
    if (result !== null) {
      this.logger.debug(
        {
          message: 'findAll',
          query: {
            searchWord: tag,
          },
          result: result,
        },
        'Get',
      );
      res.status(200).json({
        result,
      });
    } else {
      throw new Error('서버 측 에러');
    }
  }

  @Get('/user')
  async findUserAll(@Query('userId') userId: string, @Res() res: Response) {
    const result = await this.postService.findUserAll(userId);
    if (result !== null) {
      this.logger.debug(
        {
          message: 'findAll',
          query: {
            searchWord: userId,
          },
          result: result,
        },
        'Get',
      );
      res.status(200).json({
        result,
      });
    } else {
      throw new Error('서버 측 에러');
    }
  }
}
