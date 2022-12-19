import { Logger, Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { UserRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { File } from 'src/file/entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, File])],
  controllers: [UserController],
  providers: [UserService, UserRepository, Logger],
})
export class UserModule {}
