import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as AWS from 'aws-sdk';
import { config } from 'config/config';
import { Repository } from 'typeorm';
import { File } from '../entities/file.entity';
import { FileRepository } from '../repository/file.repository';

const s3 = new AWS.S3({
  accessKeyId: config.aws.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.aws.AWS_SECRET_ACCESS_KEY,
  region: config.aws.AWS_REGION,
});

@Injectable()
export class FileService {
  constructor(
    @Inject(Logger)
    private readonly logger: LoggerService,
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    @Inject(FileRepository)
    private readonly fileeRepository: FileRepository,
  ) {}

  async upload(file: Express.Multer.File) {
    const s3 = new AWS.S3();
    try {
      const originalName = Buffer.from(file.originalname).toString('utf8');
      console.log(originalName);
      const response = await s3
        .upload({
          Bucket: config.aws.bucket,
          Key: `${Date.now() + '_' + originalName}`,
          Body: file.buffer,
        })
        .promise();

      console.log(encodeURIComponent(originalName));
      const a = {
        fileName: file.originalname,
        fileUrl: response.Location,
        deployName: response.Key,
      };

      const entity = this.fileRepository.create({ ...a });

      const result = await this.fileRepository.save(entity);

      return result;
    } catch (e) {
      this.logger.error('error', e);
      throw new Error('파일 업로드에 실패하였습니다.');
    }
  }

  async findOne(id: string) {
    const entity = await this.fileeRepository.findOne(id);
    return entity;
  }

  async delete(id: string) {
    const s3 = new AWS.S3();
    try {
      const findOne = this.findOne(id);

      s3.deleteObject({
        Bucket: 'kkodac',
        Key: `${(await findOne).deployName}`,
      }).promise();

      console.log((await findOne).deployName);

      const deleteResult = await this.fileeRepository.delete(id);

      return deleteResult;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
