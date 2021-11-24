import { Router } from 'express';

import timesRouter from './time/times.routes';

const routes = Router();

routes.use('/times', timesRouter);

export default routes;
