import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeORMConfig } from 'config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { FileModule } from './file/file.module';
import { FollowModule } from './follow/follow.module';
import { HttpExceptionFilter } from './http.exception.filter';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FileModule,
    PostModule,
    AuthModule,
    UserModule,
    CommentModule,
    FollowModule,
    TypeOrmModule.forRoot(TypeORMConfig),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    Logger,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
