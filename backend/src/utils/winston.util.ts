import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

export const winstonLogger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level:
        'local' === process.env.NODE_ENV
          ? 'silly'
          : 'development' === process.env.NODE_ENV
          ? 'debug'
          : 'info',

      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        utilities.format.nestLike('Kkodac', {
          colors:
            'local' === process.env.NODE_ENV
              ? true
              : process.env.IS_OFFLINE
              ? true
              : 'development' === process.env.NODE_ENV
              ? false
              : false,
          prettyPrint: true,
        }),
      ),
    }),
  ],
});
