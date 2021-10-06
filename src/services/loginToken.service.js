import User from '../models/user';
import createToken from './createToken.service';
import bcrypt from 'bcrypt';
import logger from '../utils/logger';

async function loginTokenService(email, password, tokenBoteria, res) {

  const obj = {};

  await User.findOne({ email: email })
    .then(async (response) => {
      if (response) {
        if (bcrypt.compareSync(password.toString(), response.password.toString())) {

          obj.message = 'success',
            obj.tokenBoteria = tokenBoteria,
            obj.token = createToken({ id: response._id }),
            obj.response = response

          logger.info(`Login user success`);

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

export default loginTokenService;
