import User from '../models/user';
import createToken from './createToken.service';
import loginBoteriaService from './loginBoteria.service';
import bcrypt from 'bcrypt';

function loginService(email, password, res){

  User.findOne({email: email})
  .then(async (response) => {
    if(response) {
      if(bcrypt.compareSync(password.toString(), response.password.toString())){
        const loginUserBoteriaService = await loginBoteriaService(email, password);

        return res.status(200).json({
          message: 'success',
          tokenBoteria: loginUserBoteriaService.tokenBoteria,
          token: createToken({id: response._id}),
          response
        });
      } else {
        return res.status(403).json({
          message: 'Senha incorreta',
          result: 'error',
        });
      }
    } else {
      return res.status(404).json({
        message: 'Usuário não econtrado',
        result: 'error',
      });
    }
  })
  .catch(e => {
    return res.status(500).send(e, 'Erros Internos');
  });

  return 'returnFunction';
}

export default loginService;