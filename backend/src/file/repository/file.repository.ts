import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '../entities/file.entity';

@Injectable()
export class FileRepository {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async findOne(id: string) {
    const result = await this.fileRepository.findOne({ where: { fileId: id } });
    if (result) {
      return result;
    } else {
      throw new Error('해당 파일이 존재하지 않습니다.');
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const result = await this.fileRepository
        .createQueryBuilder('file')
        .delete()
        .where({
          fileId: id,
        })
        .execute();

      const result1 = await this.fileRepository
        .createQueryBuilder('fileMapper')
        .delete()
        .where({
          fileId: id,
        })
        .execute();
      if (0 < result.affected) {
        return result;
      } else {
        throw new Error('해당 파일이 존재하지 않습니다.');
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
