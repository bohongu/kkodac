import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostCommentMapper } from 'src/post/entities/post.comment.mapping.entity';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { CommentController } from './controller/comment.controller';
import { Comment } from './entities/comment.entity';
import { CommentRepository } from './repository/comment.repository';
import { CommentService } from './service/comment.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([Comment, PostCommentMapper, User, Post]),
  ],
  controllers: [CommentController],
  providers: [Logger, CommentService, CommentRepository],
})
export class CommentModule {}
