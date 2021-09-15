import loginBoteriaService from '../../../services/loginBoteria.service';
import createUserService from '../../../services/createUser.service';
import copyTemplateBotService from '../../../services/copyTemplateBot.service';
import nuvemshopService from '../../../services/nuvemshop.service';
import bcrypt from 'bcrypt';
import userSchema from '../../../models/user';

class BoteriaLoginUserController {
  async login(request, response) {
    try {
      const { user } = request.body;

      const salt = bcrypt.genSaltSync(10);

      const hashPassword = user.password;

      const hash = bcrypt.hashSync(hashPassword, salt);

      // AINDA É PRECISO CRIAR CONTA NO OMNI
      const loginUserBoteria = await loginBoteriaService(user.email, user.password, user.tokenReCaptcha);

      if (loginUserBoteria.status === 200) {

        const userEmail = await userSchema.find({ "email": user.email });

        if (userEmail.length === 0) {

          const copyTemplate = await copyTemplateBotService(loginUserBoteria.companyId, loginUserBoteria.organizationId, user.companyName, loginUserBoteria.userId);

          let botPublished;

          if (copyTemplate._id === null || copyTemplate._id === 'null' || copyTemplate._id === '') {
            botPublished = 1
          } else {
            botPublished = copyTemplate._id;
          }

          if (user.origin === 'nuvemshop') {
            await nuvemshopService(user.userIdStore, user.accessToken, botPublished);
          }

          const userSave = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            companyName: user.companyName,
            accessToken: user.accessToken,
            password: hash,
            botPublish: botPublished,
            origin: user.origin,
            code_rd: user.code,
            boteria: {
              userIdBoteria: loginUserBoteria.userId,
              dashboardToken: loginUserBoteria.dashboardToken,
              companyId: loginUserBoteria.companyId,
              organizationId: loginUserBoteria.organizationId
            },
            closeInitialGif: false
          };

          user.origin === 'rd' ? userSave.refreshToken_rd = user.refreshToken : userSave.userIdStore = user.userIdStore;

          createUserService(userSave);

          return response.status(200).send({
            'result': 'success',
            'message': 'Usuário cadastrado com sucesso',
            'user': userSave,
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
