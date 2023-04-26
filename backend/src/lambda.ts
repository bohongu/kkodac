// lambda.ts
import { Handler, Context } from 'aws-lambda';
import { Server } from 'http';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';

import * as express from 'express';
import { winstonLogger } from './utils/winston.util';
import * as bodyParser from 'body-parser';

const binaryMimeTypes: string[] = [
  'application/json',
  'application/xml',
  'font/eot',
  'font/opentype',
  'font/otf',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'text/comma-separated-values',
  'text/css',
  'text/html',
  'text/javascript',
  'text/plain',
  'text/text',
  'text/xml',
];

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
    nestApp.use(bodyParser.json({ limit: '50mb' }));
    nestApp.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    // nestApp.use(passport.initialize());
    // nestApp.use(passport.session());

    //class validator config
    // nestApp.useGlobalPipes(new ValidationPipe({ transform: true }));

    await nestApp.init();
    cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
  }
  return cachedServer;
}

const insertAt = (str: string | any[], sub: string, pos: number) =>
  `${str.slice(0, pos)}${sub}${str.slice(pos)}`;

export const handler: Handler = async (event: any, context: Context) => {
  cachedServer = await bootstrapServer();
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
