import { Router } from 'express';

import times from './times/index';

const routes = Router();

routes.use('/api', times);

export default routes;
