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

      console.log('CHEGOU AQUI HASH');

      // const loginUserBoteria = await loginBoteriaService(user.email, user.password, user.tokenReCaptcha);

      // if (loginUserBoteria.status === 200) {

      //   const userEmail = await userSchema.find({ "email": user.email });

      //   if (userEmail.length === 0) {

      //         const objCopyTemplate = {
            //             companyName: user.companyName,
            //             origin: user.origin,
            //             companyId: loginUserBoteria.companyId,
            //             organizationId: loginUserBoteria.organizationId,
            //             userId: loginUserBoteria.userId
            //         }

      //     const copyTemplate = await copyTemplateBotService(objCopyTemplate);

      //     let botPublished;

      //     if (copyTemplate._id === null || copyTemplate._id === 'null' || copyTemplate._id === '') {
      //       botPublished = 1
      //     } else {
      //       botPublished = copyTemplate._id;
      //     }

      //     if (user.origin === 'nuvemshop') {
      //       await nuvemshopService(user.userIdStore, user.accessToken, botPublished);
      //     }

       //             const integrationArray = [];

            //             if(user.resource === 'partner'){
            //               const integration = {
            //                 name: user.origin,
            //               }

            //               botPublished !== 1 ? integration.templateBotId = botPublished : '';

            //               user.origin !== undefined ? integration.accessToken = user.accessToken : ''
            //               user.origin === 'rd' ? integration.refreshToken_rd = user.refreshToken : integration.userIdStore = user.userIdStore
            //               user.origin === 'rd' ? integration.code = user.code : ''
            //               user.origin === 'rd' ? integration.redirectValue = 1 : '';

            //               const integrationBoteria = {
            //                 name: 'boteria',
            //                 userIdBoteria: createUserBoteria.userId,
            //                 dashboardToken: createUserBoteria.dashboardToken,
            //                 companyId: createUserBoteria.companyId,
            //                 organizationId: createUserBoteria.organizationId,
            //               }

            //               integrationArray.push(integration, integrationBoteria);
            //             } else {
            //               const integrationBoteria = {
            //                 name: 'boteria',
            //                 userIdBoteria: user.userId,
            //                 dashboardToken: user.dashboardToken,
            //                 companyId: user.companyId,
            //                 organizationId: user.organizationId
            //               }

            //               integrationArray.push(integrationBoteria);
            //             }

            //             const userSave = {
            //                 name: user.name,
            //                 email: user.email,
            //                 phone: user.phone,
            //                 companyName: user.companyName,
            //                 password: hash,
            //                 botPublish: botPublished,
            //                 originInitial: user.origin === undefined ? 'boteria' : user.origin,
            //                 integrations: integrationArray
            //             };

      //     createUserService(userSave);

      //     return response.status(200).send({
      //       'result': 'success',
      //       'message': 'Usuário cadastrado com sucesso',
      //       'user': userSave,
      //       'token': loginUserBoteria.tokenBoteria
      //     });
      //   }
      //   return response.status(200).send({
      //     'result': 'error',
      //     'message': 'Usuário já existente, insira outro email',
      //     'user': userEmail
      //   });
      // } else {
      //   return response.status(200).send({
      //     'result': 'error',
      //     'message': 'Erro ao tentar localizar seu usário, tente novamente',
      //   });
      // }
    } catch (error) {
      return response.json(error);
    }
  }
}

export default new BoteriaLoginUserController();
