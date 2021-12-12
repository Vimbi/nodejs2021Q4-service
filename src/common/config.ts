import dotenv from 'dotenv';
import path from 'path';

// const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const { PORT, NODE_ENV, MONGO_CONNECTION_STRING, JWT_SECRET_KEY, AUTH_MODE } =
  process.env;
const authMode = AUTH_MODE === 'true';

export { PORT, NODE_ENV, MONGO_CONNECTION_STRING, JWT_SECRET_KEY, authMode };
