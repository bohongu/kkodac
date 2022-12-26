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

  @Get()
  async findAll(@Query('searchWord') searchWord: string, @Res() res: Response) {
    const result = await this.postService.findAll(searchWord);
    if (result) {
      this.logger.debug(
        {
          message: 'findAll',
          query: {
            searchWord: searchWord,
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
