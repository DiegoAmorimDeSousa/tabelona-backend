import bcrypt from 'bcrypt';
import createUserService from '../../../services/createUser.service';
import boteriaService from '../../../services/boteria.service';
import copyTemplateBotService from '../../../services/copyTemplateBot.service';
import nuvemshopService from '../../../services/nuvemshop.service';
import userSchema from '../../../models/user';
import logger from '../../../utils/logger';

class CreateUserController {
  async create(request, response) {
    try {
      const { user } = request.body;

      const salt = bcrypt.genSaltSync(10);

      const hashPassword = user.password;

      const hash = bcrypt.hashSync(hashPassword, salt);

      let createUserBoteria;

      if (user.resource === 'partner') {
        const source = user.origin === 'nuvemshop' ? 'app_nuvemshop' : 'app_rd';

        const userBoteria = {
          name: user.name,
          email: user.email,
          phone: user.phone,
          companyName: user.companyName,
          password: user.password,
          origin: 'partners',
          source,
          registerFrom: {
            type: 'PARTNERS',
            _id: process.env.REGISTER_FROM_ID,
          },
        };

        createUserBoteria = await boteriaService(
          userBoteria,
          user.tokenReCaptcha
        );
      }

      if (
        user.dashboardToken !== undefined ||
        createUserBoteria.status === 200
      ) {
        const userEmail = await userSchema.find({ email: user.email });

        if (userEmail.length === 0) {
          const objCopyTemplate = {
            companyName: user.companyName,
            origin: user.origin === undefined ? 'boteria' : user.origin,
            companyId:
              createUserBoteria !== undefined
                ? createUserBoteria.companyId
                : user.companyId,
            organizationId:
              createUserBoteria !== undefined
                ? createUserBoteria.organizationId
                : user.organizationId,
            userId:
              createUserBoteria !== undefined
                ? createUserBoteria.userId
                : user.userId,
          };

          let copyTemplate = '';

          if (user.resource === 'partner') {
            copyTemplate = await copyTemplateBotService(
              objCopyTemplate,
              user.code
            );
          }

          if (copyTemplate !== '' && user.resource !== 'partner') {
            logger.error('Erro inesperado, tente novamente');

            return response.status(200).send({
              result: 'error',
              message: 'Erro inesperado, tente novamente',
              user: userEmail,
              status: 422,
            });
          }

          let botPublished;

          if (
            copyTemplate === '' ||
            copyTemplate._id === null ||
            copyTemplate._id === 'null' ||
            copyTemplate._id === '' ||
            copyTemplate === undefined
          ) {
            botPublished = 1;
          } else {
            botPublished = copyTemplate._id;
          }

          if (user.origin === 'nuvemshop') {
            await nuvemshopService(
              user.userIdStore,
              user.accessToken,
              botPublished
            );
          }

          const integrationArray = [];

          if (user.resource === 'partner') {
            const integration = {
              name: user.origin,
            };

            botPublished !== 1
              ? (integration.templateBotId = botPublished)
              : '';

            user.origin !== undefined
              ? (integration.accessToken = user.accessToken)
              : '';
            user.origin === 'rd'
              ? (integration.refreshToken_rd = user.refreshToken)
              : (integration.userIdStore = user.userIdStore);
            user.origin === 'rd' ? (integration.code = user.code) : '';
            user.origin === 'rd' ? (integration.redirectValue = 1) : '';

            integration.creationDate = new Date();

            const integrationBoteria = {
              name: 'boteria',
              userIdBoteria: createUserBoteria.userId,
              dashboardToken: createUserBoteria.dashboardToken,
              companyId: createUserBoteria.companyId,
              organizationId: createUserBoteria.organizationId,
              creationDate: new Date()
            };

            integrationArray.push(integration, integrationBoteria);
          } else {
            const integrationBoteria = {
              name: 'boteria',
              userIdBoteria: user.userId,
              dashboardToken: user.dashboardToken,
              companyId: user.companyId,
              organizationId: user.organizationId,
              creationDate: new Date()
            };

            integrationArray.push(integrationBoteria);
          }

          const userSave = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            companyName: user.companyName,
            password: hash,
            botPublish: botPublished,
            originInitial: user.origin === undefined ? 'boteria' : user.origin,
            integrations: integrationArray,
          };

          await createUserService(userSave);

          return response.status(200).send({
            result: 'success',
            message: 'Usuário cadastrado com sucesso',
            user: userSave,
            status: 200,
          });
        }

        logger.error('Usuário já existente');

        return response.status(200).send({
          result: 'error',
          message: 'Usuário já existente, insira outro email',
          user: userEmail,
          status: 422,
        });
      }
      if (createUserBoteria.status === 422) {
        return response.status(200).send(createUserBoteria);
      }
    } catch (error) {
      return response.json(error);
    }
  }
}

export default new CreateUserController();
