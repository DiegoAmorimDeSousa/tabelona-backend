import { Router } from 'express';

import publishBotController from '../../../app/controllers/bot/PublishBotController';
import buildWidController from '../../../app/controllers/bot/BuildWidController';
import listBotController from '../../../app/controllers/bot/ListBotController';
import deleteBotController from '../../../app/controllers/bot/DeleteBotController';
import countMessagesController from '../../../app/controllers/bot/CountMessagesBoController';
import getSettingsBotController from '../../../app/controllers/bot/GetSettingsBotController';
import extractMessagesBotController from '../../../app/controllers/bot/ExtractMessagesBotController';
import updateSettingsBotController from '../../../app/controllers/bot/UpdateSettingsBotController';
import getBotPublishController from '../../../app/controllers/bot/GetBotPublishController';
import coutDataController from '../../../app/controllers/bot/CountDataController';
import amountMessages from '../../../app/controllers/bot/AmountMessagesController';

const botRouter = Router();

botRouter.post('/publish', publishBotController.publish);
botRouter.get('/wid/:idbot', buildWidController.wid);
botRouter.get('/list', listBotController.list);
botRouter.post('/delete', deleteBotController.delete);
botRouter.get('/count-messages', countMessagesController.count);
botRouter.get('/get/settings', getSettingsBotController.getSettings);
botRouter.get('/extract/messages', extractMessagesBotController.extract);
botRouter.post('/update/settings', updateSettingsBotController.update);
botRouter.get('/get/publish', getBotPublishController.getPublish);
botRouter.get('/count/data', coutDataController.count);
botRouter.get('/amount-messages/:id', amountMessages.amountMessages);

export default botRouter;
