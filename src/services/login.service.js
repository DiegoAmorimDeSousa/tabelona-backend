import User from '../models/user';
import createToken from './createToken.service';
import loginBoteriaService from './loginBoteria.service';
import bcrypt from 'bcrypt';
import logger from '../utils/logger';

async function loginService(email, password, tokenReCaptcha, origin, accessToken, code, userIdStore, refreshToken_rd, res) {
  const obj = {};

  await User.findOne({ email: email })
    .then(async (response) => {
      if (response) {
        if (bcrypt.compareSync(password.toString(), response.password.toString())) {

          if(response.originInitial){
            await User.updateOne({email: email}, {
              originInitial: origin
            }).then(() => {console.log('Origin Initial updated')})
            .catch(err => {console.log(err)});
          }

          const updateIntegrations = {};

          updateIntegrations.name = origin;
          updateIntegrations.accessToken = accessToken;

          code !== undefined ? updateIntegrations.code = code : '';
          userIdStore !== undefined ? updateIntegrations.userId = userIdStore : '';
          refreshToken_rd !== undefined ? updateIntegrations.refreshToken = refreshToken_rd : '';

          await User.updateOne({email: email}, {
            $push: {integrations: updateIntegrations}
          }).then(() => {console.log('User updated')})
          .catch(err => {console.log(err)});

          const loginUserBoteriaService = await loginBoteriaService(email, password, tokenReCaptcha);

          if (loginUserBoteriaService.status === 422) {
            obj.status = 422;
            obj.result = 'error';
            obj.message = 'Antes de entrar na plataforma confirme sua conta na boteria no e-mail que você recebeu!';

            logger.error(`Login user error: ${obj.message}`);
          } else {

            obj.message = 'success',
              obj.tokenBoteria = loginUserBoteriaService.tokenBoteria,
              obj.token = createToken({ id: response._id }),
              obj.response = response

              logger.info(`Login user success`);
          }
        } else {
          obj.status = 422
          obj.message = 'Senha incorreta';
          obj.result = 'error';

          logger.error(`Login user error: ${obj.message}`);
        }
      } else {
        obj.status = 422
        obj.message = 'Usuário não encontrado';
        obj.result = 'error';

        logger.error(`Login user error: ${obj.message}`);
      }
    })
    .catch(e => {
      logger.error(`Login user error: Erros Internos`);
      return res.status(500).send(e, 'Erros Internos');
    });

  return obj;
}

export default loginService;
