import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfig } from 'config/typeorm.config';
import { FileModule } from './file/file.module';
import { UserModule } from './user/user.module';
console.log(TypeORMConfig);
@Module({
  controllers: [],
  imports: [UserModule, FileModule, TypeOrmModule.forRoot(TypeORMConfig)],
  providers: [Logger],
})
export class AppModule {}
