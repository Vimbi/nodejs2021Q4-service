import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const routeExpress =
  process.env.USE_FASTIFY === 'true' ? 'express' : 'file';
export const routeFastify =
  process.env.USE_FASTIFY === 'true' ? 'file' : 'fastify';
