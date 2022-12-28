import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from 'src/file/entities/file.entity';
import { FileController } from './controller/file.controller';
import { FileRepository } from './repository/file.repository';
import { FileService } from './service/file.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([File]),
  ],
  controllers: [FileController],
  providers: [Logger, FileService, FileRepository],
})
export class FileModule {}
