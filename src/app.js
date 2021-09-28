import 'dotenv/config';
import './bootstrap';
import 'express-async-errors';

import express from 'express';
import cors from 'cors';
import Youch from 'youch';

import routes from './routes';
import morganBody from 'morgan-body';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { url, secret } from './utils/config';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import logger from './utils/logger';

var path = require('path');
global.appRoot = path.resolve(__dirname);

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 120,
  statusCode: 429,
  message: 'Limite de requisicoes ultrapassado, por favor, aguarde.',
});

let continua = false;

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
    this.server.use(function (req, res, next) {

      const url = req.url;

      const urlSplice = url.split('/');

      let boteriaUrlExistent = false;
      let partnerStore = false;

      for (let i = 0; i < urlSplice.length; i++) {
        const element = urlSplice[i];

        if (element === 'boteria') {
          boteriaUrlExistent = true;
        }
      }

      if (urlSplice[2] === 'bot' && urlSplice[3] === 'wid') {
        partnerStore = true;
      }

      const authHeader = req.headers.authorization;
      const storeCode = req.query.code;

      if (url == '/partner/user/create' || url == '/partner/user/login' || url == '/partner/nuvemshop/customers-data-request' || url == '/partner/nuvemshop/customers-redact' || url == '/partner/nuvemshop/store-redact' || url == '/partner/rd/code') {
        next();
      } else if (boteriaUrlExistent) {
        next();
      } else if (partnerStore) {
        next();
      } else {
        if (storeCode) {
          next();
        } else {
          if (!authHeader) {
            return res.status(401).send({ error: 'No token provided' });
          } else {
            const parts = authHeader.split(' ');

            if (!(parts.length === 2)) {
              return res.status(401).send({ error: 'Token Error' });
            }

            const [scheme, token] = parts;

            if (scheme.search(/Bearer/i) === -1) {
              return res.status(401).send({ error: 'Token malformatted' });
            }

            if (token === 'null') {
              return res.status(401).send({ error: 'token null' });
            }

            jwt.verify(token, (secret ? secret : ''), (err, decod) => {
              if (err) return res.status(401).send({ error: 'Token Invalido' });
              req.body.client_id = decod.id;
              next();
            });
          }
        }
      }
    });
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
