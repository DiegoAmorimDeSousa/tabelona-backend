import { Router } from 'express';

import partner from './partner/index';

const routes = Router();

routes.use('/partner', partner);

export default routes;
