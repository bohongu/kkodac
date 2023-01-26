import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostCommentMapper } from 'src/post/entities/post.comment.mapping.entity';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { getConnection, Repository } from 'typeorm';
import { CreateCommentDto } from '../dto/comment.dto';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(PostCommentMapper)
    private readonly postCommentMapperRepository: Repository<PostCommentMapper>,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    req: Request,
  ): Promise<Comment> {
    let comment: Comment;

    const queryRunner = await getConnection().createQueryRunner();

    try {
      const authorId = await this.userRepository.findOne({
        userId: createCommentDto.authorId,
      });
      const postId = await this.postRepository.findOne({
        postId: createCommentDto.postId,
      });
      const entity = queryRunner.manager
        .getRepository(Comment)
        .create({ ...createCommentDto, authorId: authorId });
      comment = await queryRunner.manager.getRepository(Comment).save(entity);

      const entity2 = queryRunner.manager
        .getRepository(PostCommentMapper)
        .create({
          comment: comment,
          post: postId,
        });
      const test = await queryRunner.manager
        .getRepository(PostCommentMapper)
        .save(entity2);
    } catch (error) {
      throw new Error(error);
    }
    return comment;
  }

  async delete(id: string) {
    const postId = await this.postRepository.findOne({
      postId: id,
    });

    const result = await this.commentRepository.delete({ commentId: id });
    await this.postCommentMapperRepository.delete({ post: postId });
    return result;
  }
}
