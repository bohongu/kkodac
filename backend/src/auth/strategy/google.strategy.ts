import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { AuthService } from './../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL:
        'https://lgluum6zo5.execute-api.ap-northeast-2.amazonaws.com/dev/kkodac/user/auth/kakao/callback',
      scope: ['email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const googleId = profile.id;
    const username = profile._json.email;
    const nickname = profile._json.email;
    const socialfileid = profile._json.picture;

    const user = await this.authService.validateGoogle(googleId);

    if (user === null) {
      return { googleId, username, nickname, socialfileid, type: 'google' };
    }

    // 유저가 있을때
    return { user, type: 'login' };
  }
}
