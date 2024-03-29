import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from './../user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as CryptoJS from 'crypto-js';
import { Err } from 'src/error';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const existingUser = await this.userRepository.findOne({
      where: {
        username,
      },
    });
    if (!existingUser) {
      throw new BadRequestException(Err.USER.NOT_FOUND);
    }
    const password = await bcrypt.compare(pass, existingUser.password);
    if (password) {
      const { password, ...userWithoutPassword } = existingUser;
      return userWithoutPassword;
    }
    return null;
  }

  async validateKakao(kakaoId: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        kakaoAccount: kakaoId,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async validateGoogle(googleId: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        googleAccount: googleId,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async createOnceToken(socialType: string, socialId: string) {
    const payload = {
      type: socialType,
      id: socialId,
    };

    return await this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });
  }

  async createAccessToken(user: any) {
    const payload = {
      type: 'accessToken',
      id: user.userId,
      nickname: user.nickname,
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });
    return accessToken;
  }

  async createRefreshToken(user: User) {
    const payload = {
      type: 'refreshToken',
      id: user.userId,
      nickname: user.nickname,
    };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '20700m',
    });
    const tokenVerify = await this.tokenValidate(token);
    const tokenExp = new Date(tokenVerify['exp'] * 1000);

    const refreshToken = CryptoJS.AES.encrypt(
      JSON.stringify(token),
      process.env.AES_KEY,
    ).toString();

    await await this.userRepository
      .createQueryBuilder('user')
      .update()
      .set({ refreshToken: refreshToken })
      .where('userId = :id', { id: user.userId })
      .execute();
    return { refreshToken, tokenExp };
  }

  async tokenValidate(token: string) {
    return await this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
  }

  async reissueRefreshToken(user: User) {
    const existingUser = await this.userRepository.findOne({
      where: {
        userId: user.userId,
      },
    });
    if (!existingUser) {
      throw new BadRequestException(Err.USER.NOT_FOUND);
    }
    const payload = {
      id: user.userId,
      nickname: user.nickname,
      type: 'refreshToken',
    };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '20700m',
    });
    const tokenVerify = await this.tokenValidate(token);
    const tokenExp = new Date(tokenVerify['exp'] * 1000);
    const current_time = new Date();
    const time_remaining = Math.floor(
      (tokenExp.getTime() - current_time.getTime()) / 1000 / 60 / 60,
    );

    if (time_remaining > 10) {
      throw new BadRequestException(Err.TOKEN.JWT_NOT_REISSUED);
    }

    const refresh_token = CryptoJS.AES.encrypt(
      JSON.stringify(token),
      process.env.AES_KEY,
    ).toString();

    await await this.userRepository
      .createQueryBuilder('user')
      .update()
      .set({ refreshToken: refresh_token })
      .where('userId = :id', { id: user.userId })
      .execute();
    const access_token = await this.createAccessToken(user);
    return { access_token, refresh_token: { refresh_token, tokenExp } };
  }
}
