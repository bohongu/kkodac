import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Request } from 'express';
import { CreateUserDto } from '../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createUserDto: CreateUserDto, req: Request) {
    console.log(createUserDto);
    try {
      const entity = this.userRepository.create({
        ...createUserDto,
      });

      const result = await this.userRepository.save(entity);

      return result;
    } catch (error) {
      throw Error(error);
    }
  }

  async findOne(userName: string) {
    console.log(userName);
    const result = await this.userRepository
      .createQueryBuilder('user')
      .where({ userName: userName })
      .getOne();

    if (result) {
      return result;
    } else {
      throw new Error('해당하는 데이터가 없습니다');
    }
  }
}
