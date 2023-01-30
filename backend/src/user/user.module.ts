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

@Module({
  imports: [
    TypeOrmModule.forFeature([User, File, Follow]),
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
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
