import { createConnection } from 'typeorm';
import { PORT } from './common/config';
import { app } from './app';
import config from './ormconfig';
import { logger } from './logger/logger';

createConnection(config)
  .then(() => {
    app.listen(PORT, () =>
      logger.info(`App is running on http://localhost:${PORT}`)
    );
  })
  .catch((error) => {
    throw new Error(error);
  });
