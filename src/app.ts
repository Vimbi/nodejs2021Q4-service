import express from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import morgan from 'morgan';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import {
  errorHandler,
  onUncaughtException,
  onUnhandledPromiseRejection,
  stream,
} from './logger/logger';

export const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(morgan(':method :url :status :query :body', { stream }));

process.on('uncaughtException', (error: Error) => {
  onUncaughtException(error);
});

process.on('unhandledRejection', (error: Error) => {
  onUnhandledPromiseRejection(error);
});

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});
// TODO сделать везде кастомные ошибки!!!!!!!!!!!!!!!!!!!
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use(errorHandler);
