import { Router } from 'express';

import installAppController from '../../app/controllers/app/intallAppController';

const appRouter = Router();

appRouter.post('/install', installAppController.installApp);

export default appRouter;