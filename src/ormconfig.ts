import path from 'path';
import { ConnectionOptions } from 'typeorm';
import {
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_HOST,
} from './common/config';

const config: ConnectionOptions = {
  type: 'postgres',
  host: POSTGRES_HOST || 'postgres',
  port: POSTGRES_PORT ? parseInt(POSTGRES_PORT, 10) : 5432,
  username: POSTGRES_USER || 'postgres',
  password: POSTGRES_PASSWORD || 'postgres',
  database: POSTGRES_DB || 'postgres',
  synchronize: false,
  entities: [path.join(__dirname, '/**/*.model.ts')],
  migrationsRun: true,
  migrations: [path.join(__dirname, '/migrations/**/*.ts')],
  cli: {
    migrationsDir: './src/migrations',
  },
};

export default config;
