import { Router } from 'express';

import userRouter from './user/user.routes';
import authorizeRouter from './nuvemshop/nuvemshop.routes';
import botRouter from './bot/bot.routes';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/nuvemshop', authorizeRouter);
routes.use('/bot', botRouter);

export default routes;
