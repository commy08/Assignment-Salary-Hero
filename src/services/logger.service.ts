import { Request } from 'express';
import winston from 'winston';

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.timestamp()),
    }),
  ],
});

// Status - start, end or error
const start = (request: Request) => {
  const timeStamp = new Date().getTime();
  logger.log(
    'info',
    `Requesting ${request.method} ${request.originalUrl} started at ${timeStamp}`,
    {
      tags: 'http',
      additionalInfo: {
        body: request.body,
        headers: request.headers,
        params: request.params,
        query: request.query,
      },
    }
  );
};

const end = (request: Request) => {
  const timeStamp = new Date().getTime();
  logger.log('info', `Requesting ${request.method} ${request.originalUrl} ended at ${timeStamp}`);
};

const info = (request: Request, data: any) => {
  const timeStamp = new Date().getTime();
  logger.log(
    'info',
    `Requesting ${request.method} ${request.originalUrl} started at ${timeStamp}`,
    {
      tags: 'http',
      additionalInfo: {
        body: request.body,
        headers: request.headers,
        params: request.params,
        query: request.query,
        data,
      },
    }
  );
};

const error = (request: Request, error: any) => {
  const timeStamp = new Date().getTime();
  logger.error(
    'error',
    `Requesting ${request.method} ${request.originalUrl} error at ${timeStamp}`,
    {
      tags: 'http',
      additionalInfo: {
        error,
      },
    }
  );
};

const logInfo = (message: string) => {
  const timeStamp = new Date().getTime();
  logger.log('info', `${timeStamp} : ${message}`);
};

export default { start, end, error, info, logInfo };
