import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-kakao';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.KAKAO_KEY,
      callbackURL: 'http://localhost:3000/kkodac/user/auth/kakao/callback',
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    const kakaoId = String(profile.id);
    const username = String(profile._json.kakao_account.email);
    const nickname = String(profile._json.properties.nickname);
    const socialfileid = String(profile._json.properties.profile_image);

    const user = await this.authService.validateKakao(kakaoId);
    if (user === null) {
      // 유저가 없을때
      done(null, { kakaoId, username, nickname, socialfileid, type: 'kakao' });
      return { kakaoId, username, nickname, socialfileid, type: 'kakao' };
    }
    // 유저가 있을때
    done(null, { user, type: 'login' });
  }
}
