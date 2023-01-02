import { PassportModule } from '@nestjs/passport';
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NaverStrategy } from './strategy/naver.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { KakaoStrategy } from 'src/auth/strategy/kakao.strategy';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [AuthService, NaverStrategy, JwtStrategy, KakaoStrategy],
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}
