import User from '../models/user';
import createToken from './createToken.service';
import loginBoteriaService from './loginBoteria.service';
import bcrypt from 'bcrypt';

async function loginService(email, password, tokenReCaptcha, res) {

  const obj = {};

  await User.findOne({ email: email })
    .then(async (response) => {
      if (response) {
        if (bcrypt.compareSync(password.toString(), response.password.toString())) {
          const loginUserBoteriaService = await loginBoteriaService(email, password, tokenReCaptcha);

          if (loginUserBoteriaService.status === 422) {
            obj.message = 'Antes de entrar na plataforma confirme sua conta na boteria no e-mail que você recebeu!';
          } else {

            obj.message = 'success',
              obj.tokenBoteria = loginUserBoteriaService.tokenBoteria,
              obj.token = createToken({ id: response._id }),
              obj.response = response

          }
        } else {
          obj.message = 'Senha incorreta';
          obj.result = 'error';
        }
      } else {
        obj.message = 'Usuário não encontrado';
        obj.result = 'error';
      }
    })
    .catch(e => {
      return res.status(500).send(e, 'Erros Internos');
    });

  return obj;
}

export default loginService;
