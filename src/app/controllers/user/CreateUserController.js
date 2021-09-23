import bcrypt from 'bcrypt';
import createUserService from '../../../services/createUser.service';
import boteriaService from '../../../services/boteria.service';
import copyTemplateBotService from '../../../services/copyTemplateBot.service';
import nuvemshopService from '../../../services/nuvemshop.service';
import userSchema from '../../../models/user';

class CreateUserController {
    async create(request, response) {
        try {

            const { user } = request.body;

            const salt = bcrypt.genSaltSync(10);

            const hashPassword = user.password;

            const hash = bcrypt.hashSync(hashPassword, salt);

            let createUserBoteria;

            if (user.resource === 'partner') {

                const userBoteria = {
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    companyName: user.companyName,
                    password: user.password,
                    source: user.origin
                };

                createUserBoteria = await boteriaService(userBoteria, user.tokenReCaptcha);
            }

            if (user.dashboardToken !== undefined || createUserBoteria.status === 200) {

                const userEmail = await userSchema.find({ "email": user.email });

                if (userEmail.length === 0) {

                    const objCopyTemplate = {
                        companyName: user.companyName,
                        origin: user.origin === undefined ? 'boteria' : user.origin,
                        companyId: createUserBoteria !== undefined ? createUserBoteria.companyId : user.companyId,
                        organizationId: createUserBoteria !== undefined ? createUserBoteria.organizationId : user.organizationId,
                        userId: createUserBoteria !== undefined ? createUserBoteria.userId : user.userId
                    }

                    const copyTemplate = await copyTemplateBotService(objCopyTemplate);

                    if (copyTemplate._id !== undefined) {

                        let botPublished;

                        if (copyTemplate._id === null || copyTemplate._id === 'null' || copyTemplate._id === '' || copyTemplate === undefined) {
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
                            origin_initial: user.origin === undefined ? 'boteria' : user.origin,
                            integrations: [user.origin === undefined ? 'boteria' : user.origin],
                            code_rd: user.code,
                            boteria: {
                                userIdBoteria: createUserBoteria !== undefined ? createUserBoteria.userId : user.userId,
                                dashboardToken: createUserBoteria !== undefined ? createUserBoteria.dashboardToken : user.dashboardToken,
                                companyId: createUserBoteria !== undefined ? createUserBoteria.companyId : user.companyId,
                                organizationId: createUserBoteria !== undefined ? createUserBoteria.organizationId : user.organizationId
                            },
                            closeInitialGif: false
                        };

                        user.origin === 'rd' ? userSave.refreshToken_rd = user.refreshToken : userSave.userIdStore = user.userIdStore

                        console.log('USER SAVE', userSave);

                        await createUserService(userSave);

                        return response.status(200).send({
                            'result': 'success',
                            'message': 'Usuário cadastrado com sucesso',
                            'user': userSave,
                            'status': 200
                        });
                    } else {
                        return response.status(200).send({
                            'result': 'error',
                            'message': 'Erro inesperado, tente novamente',
                            'user': userEmail,
                            'status': 422
                        });
                    }
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
