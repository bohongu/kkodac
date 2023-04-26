import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from '../entities/like.entity';

@Injectable()
export class LikeRepository {
  constructor(
    @InjectRepository(Like) private readonly likeRepository: Repository<Like>,
  ) {}

  async save(like: Like) {
    await this.likeRepository.save(like);
  }

  async deleteByUserUserId(userId: string, postId: string) {
    await this.likeRepository
      .createQueryBuilder('like')
      .delete()
      .where({ post: postId })
      .andWhere({ user: userId })
      .execute();
  }

  async findDistinctLike(postId: string, userId: string) {
    try {
      const data = await this.likeRepository
        .createQueryBuilder('like')
        .select('*')
        .where({ post: postId })
        .andWhere({ user: userId })
        .execute();
      console.log(data);
      return data.length !== 0;
    } catch (error) {
      console.log(error);
    }
  }

  async findLikeCountByPostId(postId: string) {
    return {
      likeCount: await this.likeRepository
        .createQueryBuilder('like')
        .where({ post: postId })
        .getCount(),
    };
  }
}
