import { Router } from 'express';

import getCodeController from '../../../app/controllers/rd/getCodeController';


const nuvemshopRouter = Router();

nuvemshopRouter.get('/code', getCodeController.getCode);

export default nuvemshopRouter;