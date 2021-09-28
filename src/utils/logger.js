/**
 * Setup the winston logger.
 *
 * Documentation: https://github.com/winstonjs/winston
 */

 const { createLogger, format, transports } = require('winston');
 const { Loggly } = require('winston-loggly-bulk');

 const { combine, colorize, printf } = format;
 const moment = require('moment');

 // Import Functions
 const { File, Console } = transports;

 const myFormat = printf(({ level, message }) => {
   return `${moment()
     .format('YYYY-MM-DD HH:mm:ss')
     .trim()} [${level}] - ${message}`;
 });

 // Init Logger
 const wintstonLogger = createLogger({
   level: 'debug',
 });

 /**
  * For production write to all logs with level `info` and below
  * to `combined.log. Write all logs error (and below) to `error.log`.
  * For development, print to the console.
  */
 if (
   process.env.NODE_ENV === 'production' &&
   process.env.LOG_TO_FILE === 'true'
 ) {
   const fileFormat = format.combine(format.timestamp(), format.json());
   const errTransport = new File({
     filename: './logs/error.log',
     format: fileFormat,
     level: 'error',
   });
   const infoTransport = new File({
     filename: './logs/combined.log',
     format: fileFormat,
   });

   wintstonLogger.add(errTransport);
   wintstonLogger.add(infoTransport);
 } else {
   const errorStackFormat = format((info) => {
     if (info.stack) {
       return false;
     }
     return info;
   });
   const consoleTransport = new Console({
     format: combine(colorize(), errorStackFormat(), myFormat),
   });
   wintstonLogger.add(consoleTransport);
 }

 if (process.env.LOG_TO_LOGGLY === 'true') {
   wintstonLogger.add(
     new Loggly({
       token: process.env.LOGGLY_TOKEN,
       subdomain: 'flexcontact',
       tags: [process.env.LOGGLY_TAGS],
       json: true,
     })
   );
 }

 // Export logger
 module.exports = wintstonLogger;
