import { Router } from 'express';

import userRouter from './user/user.routes';
import authorizeRouter from './nuvemshop/nuvemshop.routes';
import botRouter from './bot/bot.routes';
import rdRouter from './rd/rd.routes';
import appRouter from './app.routes';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/nuvemshop', authorizeRouter);
routes.use('/bot', botRouter);
routes.use('/rd', rdRouter);
routes.use('/app', appRouter);

export default routes;
