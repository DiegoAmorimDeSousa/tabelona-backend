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
      console.log('MongoDB Conected');
    })
    .catch(err => console.log(err));
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(helmet());
    this.server.use('/', apiLimiter);
    // this.server.use(function (req, res, next) {
    //   const { name, email, phone, organizationName, password } = req.body;

    //   const url = req.url;

    //   const urlSplice = url.split('/');

    //   let boteriaUrlExistent = false;

    //   for (let i = 0; i < urlSplice.length; i++) {
    //     const element = urlSplice[i];

    //     if(element === 'boteria'){
    //       boteriaUrlExistent = true;
    //     }
    //   }

    //   const authHeader = req.headers.authorization;
    //   const storeCode = req.query.code;

    //   if(name, email, phone, organizationName, password){
    //     next();
    //   } else if(boteriaUrlExistent){
    //     next();
    //   } else {
    //     if(storeCode){
    //       next();
    //     } else {
    //       if (!authHeader){
    //         return res.status(401).send({ error: 'No token provided' });
    //       } else {
    //         const parts = authHeader.split(' ');

    //         if (!(parts.length === 2)) return res.status(401).send({ error: 'Token Error' });

    //         const [scheme, token] = parts;

    //         if (scheme.search(/Bearer/i) === -1) return res.status(401).send({ error: 'Token malformatted' });

    //         if(token === 'null') return res.status(401).send({error: 'token null'});

    //         jwt.verify(token, (secret ? secret : ''), (err, decod) => {
    //           if (err) return res.status(401).send({ error: 'Token Invalido' });
    //           req.body.client_id = decod.id;
    //           next();
    //         });
    //       }
    //     }
    //   }
    // });
    this.server.use(morgan('combined'));
    morganBody(this.server, { prettify: false });
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
