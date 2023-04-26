import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Follow } from './entities/follow.entity';
import { FollowRepository } from './repository/follow.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Follow, User])],
  providers: [FollowRepository],
  exports: [FollowRepository],
})
export class FollowModule {}
