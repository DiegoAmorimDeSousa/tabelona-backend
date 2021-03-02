import { Router } from 'express';

import authorizeNuvemshopController from '../../../app/controllers/nuvemshop/AuthorizeNuvemshopController';

const nuvemshopRouter = Router();

nuvemshopRouter.get('/authorize', authorizeNuvemshopController.authorize);

export default nuvemshopRouter;
