import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './controller/comment.controller';
import { Comment } from './entities/comment.entity';
import { CommentRepository } from './repository/comment.repository';
import { CommentService } from './service/comment.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([Comment]),
  ],
  controllers: [CommentController],
  providers: [Logger, CommentService, CommentRepository],
})
export class CommentModule {}
