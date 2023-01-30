import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/comment/entities/comment.entity';
import { File } from 'src/file/entities/file.entity';
import { Like } from 'src/like/entities/like.entity';
import { LikeRepository } from 'src/like/repository/like.repository';
import { LikeService } from 'src/like/service/like.service';
import { User } from 'src/user/entities/user.entity';
import { PostController } from './controller/post.controller';
import { PostsController } from './controller/posts.controller';
import { Post } from './entities/post.entity';
import { PostFileMapper } from './entities/post.file.mapping.entity';
import { PostTagMapper } from './entities/post.tag.mapping.entity';
import { Region } from './entities/region.entity';
import { Tag } from './entities/tag.entity';
import { PostRepository } from './repository/post.repository';
import { PostService } from './service/post.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Post,
      File,
      User,
      PostFileMapper,
      PostTagMapper,
      Tag,
      Region,
      Comment,
      Like,
    ]),
  ],
  controllers: [PostController, PostsController],
  providers: [PostService, PostRepository, Logger, LikeService, LikeRepository],
})
export class PostModule {}
