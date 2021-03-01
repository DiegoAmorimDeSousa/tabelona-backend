import loginBoteriaService from '../../../services/loginBoteria.service';
import createUserService from '../../../services/createUser.service';
import bcrypt from 'bcrypt';
import userSchema from '../../../models/user';

class BoteriaLoginUserController {
  async login(request, response){
    try {
      const {
        name,
        email,
        phone,
        companyName,
        userIdStore,
        accessToken,
        password,
      } = request.body;

      const salt = bcrypt.genSaltSync(10);

      const hashPassword = password;

      const hash = bcrypt.hashSync(hashPassword, salt);

      // AINDA É PRECISO CRIAR CONTA NO OMNI
      const loginUserBoteria = await loginBoteriaService(email, password);

      if(loginUserBoteria.status === 200){

        const userEmail = await userSchema.find({"email": email});

        if(userEmail.length === 0){

            const user = {
              name:  name,
              email: email,
              phone: phone,
              companyName: companyName,
              userIdStore: userIdStore,
              accessToken: accessToken,
              password: hash,
              botPublish: 1,
              boteria: {
                userIdBoteria: loginUserBoteria.userId,
                dashboardToken: loginUserBoteria.dashboardToken,
                companyId: loginUserBoteria.companyId,
              }
            };

          createUserService(user);

          return response.status(200).send({
            'result': 'success',
            'message': 'Usuário cadastrado com sucesso',
            'user': user
          });
        }
          return response.status(200).send({
            'result': 'error',
            'message': 'Usuário já existente, insira outro email',
            'user': userEmail
          });
      } else {
        return response.status(200).send({
          'result': 'error',
          'message': 'Erro ao tentar localizar seu usário, tente novamente',
        });
      }
    } catch (error) {
      return response.json(error);
    }
  }
}

export default new BoteriaLoginUserController();
