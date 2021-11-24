import 'dotenv/config';
import './bootstrap';
import 'express-async-errors';

import express from 'express';
import cors from 'cors';
import Youch from 'youch';

import routes from './routes';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { url } from './utils/config';
import mongoose from 'mongoose';

import logger from './utils/logger';

var path = require('path');
global.appRoot = path.resolve(__dirname);

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 120,
  statusCode: 429,
  message: 'Limite de requisicoes ultrapassado, por favor, aguarde.',
});

class App {
  constructor() {
    this.server = express();

    this.database();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  database() {
    // URL do mongodb ou acesso ao container do docker
    mongoose.connect(url || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
      .then(() => {
        logger.debug('MongoDB Conected');
      })
      .catch(err => logger.error(err));
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(helmet());
    this.server.use('/', apiLimiter);
    // this.server.use(function (req, res, next) {

    // });
    this.server.use(
      morgan((tokens, req, res) => {
        logger.debug(
          [
            tokens.method(req, res),
            tokens.url(req, res),
            '->',
            'Http Status:',
            tokens.status(req, res),
            '->',
            'Response time:',
            tokens['response-time'](req, res),
            'ms',
          ].join(' ')
        );
      })
    );
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, request, response, next) => {
      const errors = await new Youch(err, request).toJSON();
      return response.status(500).json(errors);
    });
  }
}

export default new App().server;
