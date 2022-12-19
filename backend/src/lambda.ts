// lambda.ts
import { Handler, Context } from 'aws-lambda';
import { Server } from 'http';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import * as express from 'express';
import helmet from 'helmet';
import * as bodyParser from 'body-parser';
import { ExpressAdapter } from '@nestjs/platform-express';
import { winstonLogger } from './utils/winston.util';
import { ipSetting } from './utils/ipSetting.util';

const binaryMimeTypes: string[] = [];

let cachedServer: Server;

console.log(`is offline : ${process.env.IS_OFFLINE}`);

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
    nestApp.use(eventContext());

    //class validator config
    nestApp.useGlobalPipes(new ValidationPipe({ transform: true }));

    nestApp.use(bodyParser.json({ limit: '50mb' }));
    nestApp.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    nestApp.use(helmet());
    nestApp.enableCors();

    await nestApp.init();
    cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
  }
  return cachedServer;
}

export const handler: Handler = async (event: any, context: Context) => {
  await config(event);
  cachedServer = await bootstrapServer();
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};

async function config(event: any) {
  try {
    if ('Scheduled Event' === event['detail-type']) {
      event.headers = {
        'user-agent': 'warmer',
        sourceip: 'warmer',
      };
    } else {
      await ipSetting(event);
    }
  } catch (error) {
    event.headers = { sourceip: 'no-identification' };
    throw new Error('config 에러');
  }
}
