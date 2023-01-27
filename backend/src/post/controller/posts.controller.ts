import {
  Controller,
  Get,
  Inject,
  Logger,
  LoggerService,
  Param,
  Query,
  Res,
} from '@nestjs/common';
import { PostService } from '../service/post.service';
import { Response } from 'express';

@Controller('')
export class PostsController {
  constructor(
    private readonly postService: PostService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Get('kkodac/posts')
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

  @Get('kkodac/posts/tag')
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

  @Get('kkodac/posts/user/:id')
  async findUserAll(@Param('id') id: string, @Res() res: Response) {
    const result = await this.postService.findUserAll(id);
    if (result !== null) {
      this.logger.debug(
        {
          message: 'findAll',
          query: {
            searchWord: id,
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

  @Get('kkodac/tags')
  async findTag(@Res() res: Response) {
    const result = await this.postService.findTag();
    if (result !== null) {
      this.logger.debug(
        {
          message: 'findAll',
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
