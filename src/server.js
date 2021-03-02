// load env file
console.log(`Loading env files....`);
const env = process.env.NODE_ENV || 'development';
require('dotenv').config({
  path: `./config/${env}.env`
});
console.log(`Env mode: ${env}!`);

// execute rest api
console.log(`Starting REST API....`);
import app from './app.js'
const port = process.env.PORT;
app.listen(port, console.warn(`App listening on ${port}`));
