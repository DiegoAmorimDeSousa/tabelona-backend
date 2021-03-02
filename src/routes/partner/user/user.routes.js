import { Router } from 'express';

import createUserController from '../../../app/controllers/user/CreateUserController';
import loginUserController from '../../../app/controllers/user/LoginUserController';
import authUserController from '../../../app/controllers/user/AuthUserController';
import boteriaLoginUserController from '../../../app/controllers/user/BoteriaLoginUserController';
import recoverPasswordBoteriaUserController from '../../../app/controllers/user/RecoverPasswordBoteriaUserController';

const userRouter = Router();

userRouter.post('/create', createUserController.create);
userRouter.post('/login', loginUserController.login);
userRouter.post('/auth', authUserController.auth);
userRouter.post('/boteria/login', boteriaLoginUserController.login);
userRouter.post('/boteria/recover-password', recoverPasswordBoteriaUserController.recoverPassword);

export default userRouter;
