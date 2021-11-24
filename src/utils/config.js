import { config } from 'dotenv';
import logger from '../utils/logger';

logger.debug('Loading env files...');

const env = process.env.NODE_ENV || 'development';

config({ path: `./config/${env}.env` });

logger.debug(`Env mode: ${env}!`);

export const url = process.env.MONGO_URL;

