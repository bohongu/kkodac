import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateLocalUserDto } from './dto/create-local-user.dto';
import { Err } from 'src/error';
import { v4 as uuidv4 } from 'uuid';
import { File } from 'src/file/entities/file.entity';
import { Follow } from 'src/follow/entities/follow.entity';
import { FollowDto } from './dto/follow-dto';
import { FollowRepository } from 'src/follow/repository/follow.repository';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    private readonly followRepository: FollowRepository,
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

    const defaultProfile = await this.fileRepository.findOne({
      where: {
        fileId: 'ae59725b-d72e-41d5-937b-bd717f78d6a8',
      },
    });
    const hashedPassword = await bcrypt.hash(createLocalUserDto.password, 10);
    await this.userRepository.save({
      userId: uuidv4(),
      username: createLocalUserDto.username,
      password: hashedPassword,
      nickname: createLocalUserDto.nickname,
      fileId: defaultProfile,
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

  async findUser(user) {
    const existingUser = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.fileId', 'fileId')
      .where({ userId: user.userId })
      .getOne();

    if (!existingUser) {
      throw new BadRequestException(Err.USER.NOT_FOUND);
    }
    return existingUser;
  }

  async patch(updateUserDto, id) {
    const file = await this.fileRepository.findOne({
      fileId: updateUserDto.fileId,
    });

    if (updateUserDto.fileId) {
      const result = await this.userRepository
        .createQueryBuilder('user')
        .update({
          socialFileId: null,
          fileId: file,
          ...updateUserDto,
        })
        .where({
          userId: id,
        })
        .execute();

      return result;
    } else {
      try {
        const result = await this.userRepository
          .createQueryBuilder('user')
          .update({
            socialFileId: null,
            ...updateUserDto,
          })
          .where({
            userId: id,
          })
          .execute();

        return result;
      } catch (error) {
        console.log(error);
      }
    }
  }

  async addFollow(followDto: FollowDto) {
    const { userId, followedUserId } = followDto;

    if (userId === followedUserId)
      throw new BadRequestException('스스로를 팔로우할 수 없습니다.');

    const user = await this.userRepository.findOne({ userId: userId });
    const followedUser = await this.userRepository.findOne({
      userId: followedUserId,
    });

    if (!user || !followedUser)
      throw new NotFoundException('사용자를 찾을 수 없습니다.');

    const f = await this.followRepository.findFollow(userId, followedUserId);
    if (f) {
      throw new ConflictException('이미 팔로우가 되어 있습니다.');
    }
    const follow = plainToInstance(Follow, {
      user: userId,
      followedUser: followedUserId,
    });

    await this.followRepository.save(follow);
    return {
      statusCode: 200,
      message: 'Success',
      followId: follow.followId,
    };
  }

  async deleteFollow(followDto: FollowDto) {
    const { userId, followedUserId } = followDto;

    if (userId === followedUserId)
      throw new BadRequestException('스스로를 팔로우 취소할 수 없습니다.');

    const user = await this.userRepository.findOne({ userId: userId });
    const followedUser = await this.userRepository.findOne({
      userId: followedUserId,
    });

    if (!user || !followedUser)
      throw new NotFoundException('사용자를 찾을 수 없습니다.');

    const f = await this.followRepository.findFollow(userId, followedUserId);

    await this.followRepository.delete({
      followId: f.followId,
    });

    return { statusCode: 200, message: 'Success' };
  }

  async getFollowList(id: string, viewerId: string) {
    try {
      const users_followed_by_user = await this.followRepository.findFollowing(
        id,
        viewerId,
      );
      const users_follow_user = await this.followRepository.findFollower(
        id,
        viewerId,
      );

      // if (users_followed_by_user) {
      //   users_followed_by_user.map((record) => {
      //     record.is_followed_by_viewer = record.is_followed_by_viewer === '0';
      //     return record;
      //   });
      // } else {
      //   return users_followed_by_user;
      // }

      // if (users_follow_user) {
      //   users_follow_user.map((record) => {
      //     record.is_followed_by_viewer = record.is_followed_by_viewer === '0';
      //     return record;
      //   });
      // } else {
      //   return users_follow_user;
      // }

      return {
        userId: id,
        users_followed_by_user,
        users_follow_user,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getUser(id: string) {
    const result = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.fileId', 'fileId')
      .where({ userId: id })
      .getOne();

    const follow = await this.followRepository.findFollowingCnt(id);
    const follower = await this.followRepository.findFollowerCnt(id);

    delete result._id;
    delete result.createdAt;
    delete result.googleAccount;
    delete result.kakaoAccount;
    delete result.nickname;
    delete result.password;
    delete result.refreshToken;
    delete result.updatedAt;
    delete result.fileId._id;
    delete result.fileId.createdAt;
    delete result.fileId.deployName;
    delete result.fileId.fileId;
    delete result.fileId.fileName;
    if (!result) {
      throw new BadRequestException(Err.USER.NOT_FOUND);
    }
    return { result, follow, follower };
  }
}
