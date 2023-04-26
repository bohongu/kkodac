import { Module, forwardRef, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from './../auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from 'src/auth/strategy/local.strategy';
import { KakaoStrategy } from 'src/auth/strategy/kakao.strategy';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { GoogleStrategy } from 'src/auth/strategy/google.strategy';
import { File } from 'src/file/entities/file.entity';
import { Follow } from 'src/follow/entities/follow.entity';
import { FollowRepository } from 'src/follow/repository/follow.repository';
import { PostService } from 'src/post/service/post.service';
import { Post } from 'src/post/entities/post.entity';
import { PostRepository } from 'src/post/repository/post.repository';
import { Tag } from 'src/post/entities/tag.entity';
import { PostTagMapper } from 'src/post/entities/post.tag.mapping.entity';
import { PostFileMapper } from 'src/post/entities/post.file.mapping.entity';
import { Like } from 'src/like/entities/like.entity';
import { PostCommentMapper } from 'src/post/entities/post.comment.mapping.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      File,
      Follow,
      Post,
      Tag,
      PostTagMapper,
      PostFileMapper,
      Like,
      PostCommentMapper,
    ]),
    forwardRef(() => AuthModule),
  ],
  providers: [
    UserService,
    AuthService,
    Logger,
    JwtModule,
    LocalStrategy,
    JwtStrategy,
    KakaoStrategy,
    GoogleStrategy,
    Logger,
    FollowRepository,
    PostRepository,
    PostService,
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
