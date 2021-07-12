import { Router } from 'express';

import authorizeNuvemshopController from '../../../app/controllers/nuvemshop/AuthorizeNuvemshopController';
import getEmailStoreController from '../../../app/controllers/nuvemshop/GetEmailStoreControlle';
import customersDataRequestController from '../../../app/controllers/nuvemshop/lgpd/CustomersDataRequestController';
import customersRedactController from '../../../app/controllers/nuvemshop/lgpd/CustomersRedactController';
import storeRedactController from '../../../app/controllers/nuvemshop/lgpd/StoreRedactController';

const nuvemshopRouter = Router();

nuvemshopRouter.get('/authorize', authorizeNuvemshopController.authorize);
nuvemshopRouter.get('/get/email', getEmailStoreController.getEmail);
nuvemshopRouter.post('/customers-data-request', customersDataRequestController.customersDataRequest);
nuvemshopRouter.post('/customers-redact', customersRedactController.customersRedact);
nuvemshopRouter.post('/store-redact', storeRedactController.storeRedact);

export default nuvemshopRouter;
