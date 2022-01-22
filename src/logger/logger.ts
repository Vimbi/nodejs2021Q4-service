import morgan from 'morgan';
import winston, { createLogger, format, transports } from 'winston';
import { NextFunction, Request, Response } from 'express';
import { IRequest } from '../common/types/request';
import { LOG_LEVEL, NODE_ENV } from '../common/config';
// import { CustomError } from '../common/types/custom-error';
import { STATUS_CODES, RESPONSE_MESSAGES } from '../utils/constants';
import { CustomError } from '../error/error';

const myCustomLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
    all: 4,
  },
};

const errTransport = new transports.File({
  filename: `${__dirname}/../../logs/error.log`,
  level: 'error',
});

const allTransport = new transports.File({
  filename: `${__dirname}/../../logs/combined.log`,
});

const logger = createLogger({
  levels: myCustomLevels.levels,
  level: LOG_LEVEL,
  transports: [errTransport, allTransport],
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  exitOnError: false,
});

if (NODE_ENV === 'development') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

morgan.token('query', (req: IRequest) => JSON.stringify(req.query));
morgan.token('body', (req: IRequest) => JSON.stringify(req.body));

const stream = {
  write: (message: string) => {
    logger.info(message);
  },
};

const onUncaughtException = (error: Error): void => {
  logger.error(
    `error message = ${JSON.stringify(error.message)}, stack trace = ${
      error.stack
    }`
  );
  logger.info('Process exit');
  logger.on('finish', () => {
    process.exit(1);
  });
};

const onUnhandledPromiseRejection = (reason: Error): void => {
  logger.error(
    `reject message = ${JSON.stringify(reason.message)}, stack trace = ${
      reason.stack
    }`
  );
  logger.info('Process exit');
  logger.on('finish', () => {
    process.exit(1);
  });
};

const errorHandler = (
  error: CustomError,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error.status) {
    res.status(error.status).send(error.message);
  } else {
    logger.error(`error.status: 500, message: ${error.message}`);
    res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .send(RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR);
  }
  next();
};

export {
  logger,
  stream,
  onUncaughtException,
  onUnhandledPromiseRejection,
  errorHandler,
};
