import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import CryptoJS from 'crypto-js';
import { User } from 'src/users/user.entity';
import { getConnection } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(user_name: string): Promise<any> {
    const user = await this.usersService.findUserByName(user_name);
    if (!user) {
      return null;
    }
    return user;
  }

  async createLoginToken(user: User) {
    const payload = {
      user_id: user._id,
      user_token: 'loginToken',
    };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '6m',
    });
  }

  async createRefreshToken(user: User) {
    const payload = {
      user_id: user._id,
      user_token: 'refreshToken',
    };

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '50m',
    });

    const refresh_token = CryptoJS.AES.encrypt(
      JSON.stringify(token),
      process.env.AES_KEY,
    ).toString();

    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({ user_refresh_token: token })
      .where(`_id = ${user._id}`)
      .execute();
    return refresh_token;
  }

  onceToken(user_profile: any) {
    const payload = {
      nickname: user_profile.nickname,
      password: user_profile.password,
      user_name: user_profile.user_name,
      user_token: 'onceToken',
    };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '10m',
    });
  }

  async tokenValidate(token: string) {
    return await this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
