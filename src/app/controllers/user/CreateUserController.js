import bcrypt from 'bcrypt';
import createUserService from '../../../services/createUser.service';
import boteriaService from '../../../services/boteria.service';
import copyTemplateBotService from '../../../services/copyTemplateBot.service';
import nuvemshopService from '../../../services/nuvemshop.service';
import userSchema from '../../../models/user';

class CreateUserController {
    async create(request, response) {
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

            const userBoteria = {
                name: name,
                email: email,
                phone: phone,
                companyName: companyName,
                password: password,
                source: 'LP_nuvemshop'
            };

            // AINDA É PRECISO CRIAR CONTA NO OMNI
            const createUserBoteria = await boteriaService(userBoteria, tokenReCaptcha);

            if (createUserBoteria.status === 200) {
                const userEmail = await userSchema.find({ "email": email });

                if (userEmail.length === 0) {

                    const copyTemplate = await copyTemplateBotService(createUserBoteria.companyId, createUserBoteria.organizationId, companyName);
                    let botPublished;

                    if (copyTemplate._id === null || copyTemplate._id === 'null' || copyTemplate._id === '' || copyTemplate === undefined) {
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
                            userIdBoteria: createUserBoteria.userId,
                            dashboardToken: createUserBoteria.dashboardToken,
                            companyId: createUserBoteria.companyId,
                            organizationId: createUserBoteria.organizationId
                        },
                        closeInitialGif: false
                    };

                    await createUserService(user);

                    return response.status(200).send({
                        'result': 'success',
                        'message': 'Usuário cadastrado com sucesso',
                        'user': user,
                        'status': 200
                    });
                }
                return response.status(200).send({
                    'result': 'error',
                    'message': 'Usuário já existente, insira outro email',
                    'user': userEmail,
                    'status': 422
                });
            } else if (createUserBoteria.status === 422) {
                return response.status(200).send(createUserBoteria);
            }
        } catch (error) {
            return response.json(error);
        }
    }
}

export default new CreateUserController();
