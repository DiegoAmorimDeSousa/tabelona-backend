import { Router } from 'express';

import createTimeController from '../../../app/controllers/createTimeController';
import getTimesController from '../../../app/controllers/getTimesController';

const botRouter = Router();

botRouter.post('/create', createTimeController.createTime);
botRouter.get('/', getTimesController.getTimes);

export default botRouter;
