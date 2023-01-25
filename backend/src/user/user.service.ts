import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateLocalUserDto } from './dto/create-local-user.dto';
import { Err } from 'src/error';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async localRegister(createLocalUserDto: CreateLocalUserDto) {
    const existingusername = await this.userRepository.findOne({
      where: {
        username: createLocalUserDto.username,
      },
    });
    if (existingusername) {
      throw new BadRequestException(Err.USER.EXISTING_USER);
    }
    const existingNickname = await this.userRepository.findOne({
      where: {
        nickname: createLocalUserDto.nickname,
      },
    });
    if (existingNickname) {
      throw new BadRequestException(Err.USER.EXISTING_NICKNAME);
    }
    const hashedPassword = await bcrypt.hash(createLocalUserDto.password, 10);
    await this.userRepository.save({
      userId: uuidv4(),
      username: createLocalUserDto.username,
      password: hashedPassword,
      nickname: createLocalUserDto.nickname,
    });

    const result = await this.userRepository.findOne({
      where: {
        nickname: createLocalUserDto.nickname,
      },
    });

    return result;
  }

  async socialRegister(user) {
    if (user.type === 'login') {
      throw new BadRequestException(Err.USER.EXISTING_USER);
    }

    // 1회용 토큰인경우
    if (user.type === 'kakao') {
      return await this.userRepository.save({
        userId: uuidv4(),
        username: user.username,
        kakaoAccount: user.kakaoId,
        nickname: user.nickname,
        socialFileId: user.socialfileid,
      });
    } else if (user.type === 'google') {
      return await this.userRepository.save({
        userId: uuidv4(),
        username: user.username,
        kakaoAccount: user.kakaoId,
        nickname: user.nickname,
        socialFileId: user.socialfileid,
        googleAccount: user.googleId,
      });
    }
  }

  async findUserByusername(username: string) {
    const existingUser = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });
    if (!existingUser) {
      throw new BadRequestException(Err.USER.NOT_FOUND);
    }
    return existingUser;
  }

  async findUserById(userId: number) {
    const existingUser = await this.userRepository.findOne({
      where: {
        userId,
      },
    });
    if (!existingUser) {
      throw new BadRequestException(Err.USER.NOT_FOUND);
    }
    return existingUser;
  }
}
