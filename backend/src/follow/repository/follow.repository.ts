import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Follow } from '../entities/follow.entity';

@Injectable()
export class FollowRepository {
  constructor(
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Follow[]> {
    return await this.followRepository.find({
      relations: ['user', 'followedUser'],
    });
  }

  async findFollow(userId: string, followedUserId: string) {
    return await this.followRepository.findOne({
      where: {
        user: { userId: userId },
        followedUser: { userId: followedUserId },
      },
      relations: ['user', 'followedUser'],
    });
  }

  async save(follow: Follow) {
    return await this.followRepository.save(follow);
  }

  async delete(idInfo) {
    await this.followRepository.delete(idInfo);
  }

  async findFollowing(userId: string, viewerId: string) {
    const result = await this.followRepository.query(
      `SELECT follows.*, ISNULL(followed_user_Id) AS is_followed_by_viewer FROM\
      (SELECT follow.user_id FROM follow LEFT JOIN user_tb ON user_tb.user_id = follow.followed_user_id WHERE follow.user_id='${userId}') AS follows\
      LEFT JOIN (SELECT followed_user_Id FROM follow WHERE follow.followed_user_id='${viewerId}') AS sub ON sub.followed_user_id = follows.user_id;`,
    );

    if (result.length === 0) {
      return result;
    } else {
      for (const i in result) {
        const fileId = await this.userRepository
          .createQueryBuilder('user')
          .leftJoinAndSelect('user.fileId', 'fileId')
          .where({ userId: result[i].user_id })
          .getOne();

        delete fileId._id;
        delete fileId.kakaoAccount;
        delete fileId.introduce;
        delete fileId.googleAccount;
        delete fileId.refreshToken;
        delete fileId.password;
        delete fileId.username;
        delete fileId.createdAt;
        delete fileId.updatedAt;
        delete fileId.fileId.createdAt;
        delete fileId.fileId._id;
        delete fileId.fileId.deployName;
        delete fileId.fileId.fileId;
        delete fileId.fileId.fileName;

        result[i] = fileId;
      }
      return result;
    }
  }

  isExistQuery = (query: string) => `SELECT EXISTS(${query})`;

  async findFollower(id: string, viewerId: string) {
    const result = await this.followRepository
      .query(`SELECT followers.*, ISNULL(followed_user_Id) AS is_followed_by_viewer\
      FROM (SELECT follow.user_id FROM follow LEFT JOIN user_tb ON user_tb.user_id=follow.user_id WHERE followed_user_id='${id}') AS followers\
      LEFT JOIN (SELECT followed_user_Id FROM follow WHERE follow.user_id='${viewerId}') AS sub ON sub.followed_user_id = followers.user_id;`);

    if (result.length === 0) {
      return result;
    } else {
      for (const i in result) {
        const fileId = await this.userRepository
          .createQueryBuilder('user')
          .leftJoinAndSelect('user.fileId', 'fileId')
          .where({ userId: result[i].user_id })
          .getOne();

        delete fileId._id;
        delete fileId.kakaoAccount;
        delete fileId.googleAccount;
        delete fileId.introduce;
        delete fileId.refreshToken;
        delete fileId.password;
        delete fileId.username;
        delete fileId.createdAt;
        delete fileId.updatedAt;
        delete fileId.fileId.createdAt;
        delete fileId.fileId._id;
        delete fileId.fileId.deployName;
        delete fileId.fileId.fileId;
        delete fileId.fileId.fileName;

        result[i] = fileId;
      }
      return result;
    }
  }

  async findFollowingCnt(id: string) {
    return await this.followRepository.query(
      `SELECT COUNT(*) AS count FROM follow_tb LEFT JOIN user_tb ON user_tb.user_id = follow_tb.followed_user_id WHERE follow_tb.user_id = '${id}';`,
    );
  }

  async findFollowerCnt(id: string) {
    return await this.followRepository.query(
      `SELECT COUNT(*) AS count FROM follow_tb LEFT JOIN user_tb ON user_tb.user_id = follow_tb.user_id WHERE follow_tb.followed_user_id = '${id}'; `,
    );
  }
}
