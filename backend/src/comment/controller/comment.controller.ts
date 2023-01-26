import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Inject,
  Logger,
  LoggerService,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateCommentDto } from '../dto/comment.dto';
import { CommentService } from '../service/comment.service';

@Controller('/kkodac')
export class CommentController {
  constructor(
    @Inject(Logger)
    private readonly logger: LoggerService,
    private readonly commentService: CommentService,
  ) {}

  @Post('/comment')
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const result = await this.commentService.create(createCommentDto, req);
    if (result) {
      this.logger.debug(
        {
          message: 'create',
          result: {
            ...result,
          },
        },
        'Comment',
      );
      res.status(HttpStatus.OK).json({ message: 'OK', result: result });
    } else {
      throw new Error('서버 측 에러');
    }
  }

  @Delete('comment/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const result = await this.commentService.delete(id);
    if (result) {
      this.logger.debug(
        {
          message: 'delete',
          param: { id: id },
        },
        'Comment',
      );
      res.status(HttpStatus.OK).json('OK');
    } else {
      throw new Error('서버 측 에러');
    }
  }
}
