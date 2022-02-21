import { Router } from 'express';

import createTimeController from '../../../app/controllers/createTimeController';
import getTimesController from '../../../app/controllers/getTimesController';
import updatePontuationController from '../../../app/controllers/updatePontuationController';
import refreshClassificationController from '../../../app/controllers/refreshClassificationController';
import changeScoreTimeController from '../../../app/controllers/changeScoreTimeController';

const botRouter = Router();

botRouter.post('/create', createTimeController.createTime);
botRouter.get('/', getTimesController.getTimes);
botRouter.put('/update-pontuation', updatePontuationController.updatePontuationController);
botRouter.post('/refresh-classification', refreshClassificationController.refreshClassification);
botRouter.post('/change-score', changeScoreTimeController.changeScoreTime);

export default botRouter;
