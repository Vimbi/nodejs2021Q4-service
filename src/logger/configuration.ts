import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

const options = {
  json: true,
  datePattern: 'DD-MM-YYYY',
  handleExceptions: false,
  handleRejections: false,
  zippedArchive: true,
  maxSize: '10m',
  maxFiles: '14d',
};

const infoTransport = new winston.transports.DailyRotateFile({
  ...options,
  level: 'info',
  filename: `${__dirname}/../../logs/info-%DATE%.log`,
});

const errorTransport = new winston.transports.DailyRotateFile({
  ...options,
  level: 'error',
  filename: `${__dirname}/../../logs/error-%DATE%.log`,
});

const consoleTransport = new winston.transports.Console({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.ms(),
    nestWinstonModuleUtilities.format.nestLike('nodejs2021Q4-service API', {
      prettyPrint: true,
    })
  ),
});

export const configuration = {
  transports: [infoTransport, errorTransport, consoleTransport],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  exitOnError: false,
};
