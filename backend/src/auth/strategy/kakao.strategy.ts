import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-kakao';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.KAKAO_KEY,
      callbackURL:
        'https://lgluum6zo5.execute-api.ap-northeast-2.amazonaws.com/dev/kkodac/user/auth/kakao/callback',
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

    const findUser = await this.authService.validateKakao(kakaoId);

    if (findUser === null) {
      // 유저가 없을때
      const user = {
        kakaoId,
        username,
        nickname,
        socialfileid,
        type: 'kakao',
      };

      done(null, { kakaoId, username, nickname, socialfileid, type: 'kakao' });

      return user;
    }
    // 유저가 있을때
    done(null, { findUser, type: 'login' });

    const user = { findUser, type: 'login' };
    return user;
  }
}
