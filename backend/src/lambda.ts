// lambda.ts
import { Handler, Context } from 'aws-lambda';
import { Server } from 'http';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import * as express from 'express';
import { winstonLogger } from './utils/winston.util';

const binaryMimeTypes: string[] = [];

let cachedServer: Server;

async function bootstrapServer(): Promise<Server> {
  if (!cachedServer) {
    const expressApp = express();
    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
      {
        logger: winstonLogger,
      },
    );
    nestApp.enableCors();
    nestApp.use(eventContext());

    //class validator config
    nestApp.useGlobalPipes(new ValidationPipe({ transform: true }));

    await nestApp.init();
    cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
  }
  return cachedServer;
}

const insertAt = (str: string | any[], sub: string, pos: number) =>
  `${str.slice(0, pos)}${sub}${str.slice(pos)}`;

export const handler: Handler = async (event: any, context: Context) => {
  cachedServer = await bootstrapServer();
  console.log('a');
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
