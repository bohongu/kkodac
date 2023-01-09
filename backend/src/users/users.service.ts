import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  async findUserByName(user_name: string): Promise<User | undefined> {
    const user = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.user_name = :user_name', { user_name })
      .getOne();
    return user;
  }

  async findUserById(user_id: number): Promise<User | undefined> {
    const user = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.user_id = :user_id', { user_id })
      .getOne();
    return user;
  }
}
