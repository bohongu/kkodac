import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Logger,
  LoggerService,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FileService } from '../service/file.service';

@Controller('/kkodac')
export class FileController {
  constructor(
    @Inject(Logger)
    private readonly logger: LoggerService,
    private readonly fileService: FileService,
  ) {}

  @Post('/file')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    console.log(file);
    const result = await this.fileService.upload(file);
    if (result) {
      this.logger.debug(
        {
          message: 'upload',
          result: {
            ...result,
          },
        },
        'File',
      );
      res
        .status(HttpStatus.OK)
        .json({ message: 'OK', id: result.fileId, url: result.fileUrl });
    } else {
      throw new Error('서버 측 에러');
    }
  }

  @Get('/file/:id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const result = await this.fileService.findOne(id);
    if (result) {
      this.logger.debug(
        {
          message: 'findOne',
          body: { id: id },
          result: result,
        },
        'File',
      );
      res.status(HttpStatus.OK).json({ message: 'OK', data: result });
    } else {
      throw new Error('서버 측 에러');
    }
  }

  @Delete('file/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    const result = await this.fileService.delete(id);
    if (result) {
      this.logger.debug(
        {
          message: 'delete',
          param: { id: id },
        },
        'File',
      );
      res.status(HttpStatus.OK).json('OK');
    } else {
      throw new Error('서버 측 에러');
    }
  }
}
