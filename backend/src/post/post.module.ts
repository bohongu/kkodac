import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from 'src/file/entities/file.entity';
import { User } from 'src/users/user.entity';
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
    ]),
  ],
  controllers: [PostController, PostsController],
  providers: [PostService, PostRepository, Logger],
})
export class PostModule {}
