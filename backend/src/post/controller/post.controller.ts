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
  Delete,
  Patch,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostService } from '../service/post.service';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Update } from 'aws-sdk/clients/dynamodb';

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

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const result = await this.postService.findOne(id);
    if (result) {
      this.logger.debug(
        {
          message: 'findOne',
          query: {
            id: id,
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

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Res() res: Response,
  ) {
    const result = await this.postService.update(id, updatePostDto);
    if (result) {
      this.logger.debug(
        {
          message: 'update',
          query: {
            id: id,
            data: updatePostDto,
          },
          result: result,
        },
        'Patch',
      );
      res.status(200).json({
        result,
      });
    } else {
      throw new Error('서버 측 에러');
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const result = await this.postService.delete(id);
    if (result) {
      this.logger.debug(
        {
          message: 'delete',
          query: {
            id: id,
          },
          result: result,
        },
        'Delete',
      );
      res.status(200).json({
        result,
      });
    } else {
      throw new Error('서버 측 에러');
    }
  }
}
