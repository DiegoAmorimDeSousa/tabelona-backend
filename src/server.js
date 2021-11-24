// load env file
const logger = require('./utils/logger');

logger.debug(`Loading env files....`);
const env = process.env.NODE_ENV || 'development';
require('dotenv').config({
  path: `./config/${env}.env`
});
logger.debug(`Env mode: ${env}!`);

// execute rest api
logger.debug(`Starting REST API....`);
import app from './app.js'
const port = process.env.PORT;
app.listen(port, logger.debug(`App listening on ${port}`));
