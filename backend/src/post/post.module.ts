import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from 'src/file/entities/file.entity';
import { User } from 'src/user/entities/user.entity';
import { PostController } from './controller/post.controller';
import { PostsController } from './controller/posts.controller';
import { Post } from './entities/post.entity';
import { PostFileMapper } from './entities/post.file.mapping.entity';
import { PostTagMapper } from './entities/post.tag.mapping.entity';
import { Tag } from './entities/tag.entity';
import { PostRepository } from './repository/post.repository';
import { PostService } from './service/post.service';
console.log('@');
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Post,
      File,
      User,
      PostFileMapper,
      PostTagMapper,
      Tag,
    ]),
  ],
  controllers: [PostController, PostsController],
  providers: [PostService, PostRepository, Logger],
})
export class PostModule {}
