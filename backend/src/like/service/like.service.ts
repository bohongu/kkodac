import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { LikePostDto } from 'src/post/dto/like-post.dto';
import { Post } from 'src/post/entities/post.entity';
import { PostRepository } from 'src/post/repository/post.repository';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Like } from '../entities/like.entity';
import { LikeRepository } from '../repository/like.repository';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly likeRepository: LikeRepository,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly ppostRepository: PostRepository,
  ) {}

  async postLike(likePostDto: LikePostDto) {
    const { userId, postId } = likePostDto;
    const isDistinct = await this.likeRepository.findDistinctLike(
      postId,
      userId,
    );
    if (isDistinct) {
      throw new ConflictException('이미 좋아요를 눌렀습니다.');
      return;
    }
    try {
      const post = await this.postRepository.findOne({
        where: {
          postId: postId,
        },
      });
      console.log(post);
      const user = await this.userRepository.findOne({ userId: userId });
      const like = plainToInstance(Like, { post, user });
      console.log(like);
      await this.likeRepository.save(like);
      return await this.likeRepository.findLikeCountByPostId(postId);
    } catch (error) {
      console.log(error);
    }
  }

  async postUnLike(likePostDto: LikePostDto) {
    const { userId, postId } = likePostDto;
    await this.likeRepository.deleteByUserUserId(userId, postId);
    return await this.likeRepository.findLikeCountByPostId(postId);
  }

  async getPostLikeList(id: string) {
    return await this.ppostRepository.findLikeListByPostId(id);
  }
}
