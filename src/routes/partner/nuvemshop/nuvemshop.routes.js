import { Router } from 'express';

import authorizeNuvemshopController from '../../../app/controllers/nuvemshop/AuthorizeNuvemshopController';
import getEmailStoreController from '../../../app/controllers/nuvemshop/GetEmailStoreControlle';

const nuvemshopRouter = Router();

nuvemshopRouter.get('/authorize', authorizeNuvemshopController.authorize);
nuvemshopRouter.get('/get/email', getEmailStoreController.getEmail);

export default nuvemshopRouter;
