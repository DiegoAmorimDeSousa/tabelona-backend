import { Router } from 'express';

import createTimeController from '../../../app/controllers/createTimeController';
import getTimesController from '../../../app/controllers/getTimesController';
import updatePontuationController from '../../../app/controllers/updatePontuationController';

const botRouter = Router();

botRouter.post('/create', createTimeController.createTime);
botRouter.get('/', getTimesController.getTimes);
botRouter.put('/update-pontuation', updatePontuationController.updatePontuationController);

export default botRouter;
