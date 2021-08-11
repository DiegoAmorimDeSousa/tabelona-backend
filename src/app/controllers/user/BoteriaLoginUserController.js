import loginBoteriaService from '../../../services/loginBoteria.service';
import createUserService from '../../../services/createUser.service';
import copyTemplateBotService from '../../../services/copyTemplateBot.service';
import nuvemshopService from '../../../services/nuvemshop.service';
import bcrypt from 'bcrypt';
import userSchema from '../../../models/user';

class BoteriaLoginUserController {
  async login(request, response) {
    try {
      const {
        name,
        email,
        phone,
        companyName,
        userIdStore,
        accessToken,
        password,
        tokenReCaptcha
      } = request.body;

      const salt = bcrypt.genSaltSync(10);

      const hashPassword = password;

      const hash = bcrypt.hashSync(hashPassword, salt);

      // AINDA É PRECISO CRIAR CONTA NO OMNI
      const loginUserBoteria = await loginBoteriaService(email, password, tokenReCaptcha);

      if (loginUserBoteria.status === 200) {

        const userEmail = await userSchema.find({ "email": email });

        if (userEmail.length === 0) {

          const copyTemplate = await copyTemplateBotService(loginUserBoteria.companyId, loginUserBoteria.organizationId, companyName);

          let botPublished;

          if (copyTemplate._id === null || copyTemplate._id === 'null' || copyTemplate._id === '') {
            botPublished = 1
          } else {
            botPublished = copyTemplate._id;
          }

          await nuvemshopService(userIdStore, accessToken, botPublished);

          const user = {
            name: name,
            email: email,
            phone: phone,
            companyName: companyName,
            userIdStore: userIdStore,
            accessToken: accessToken,
            password: hash,
            botPublish: botPublished,
            boteria: {
              userIdBoteria: loginUserBoteria.userId,
              dashboardToken: loginUserBoteria.dashboardToken,
              companyId: loginUserBoteria.companyId,
              organizationId: loginUserBoteria.organizationId
            },
            closeInitialGif: false
          };

          createUserService(user);

          return response.status(200).send({
            'result': 'success',
            'message': 'Usuário cadastrado com sucesso',
            'user': user,
            'token': loginUserBoteria.tokenBoteria
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
