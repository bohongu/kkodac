import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from 'src/file/entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  controllers: [],
  providers: [Logger],
})
export class FileModule {}
