import bcrypt from 'bcrypt';
import createUserService from '../../../services/createUser.service';
import boteriaService from '../../../services/boteria.service';
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
      } = request.body;

      const salt = bcrypt.genSaltSync(10);

      const hashPassword = password;

      const hash = bcrypt.hashSync(hashPassword, salt);

      const userBoteria = {
        name:  name,
        email: email,
        phone: phone,
        companyName: companyName,
        password: password,
      };

      // AINDA É PRECISO CRIAR CONTA NO OMNI
      const createUserBoteria = await boteriaService(userBoteria);

      if(createUserBoteria.status === 200){
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
                userIdBoteria: createUserBoteria.userId,
                dashboardToken: createUserBoteria.dashboardToken,
                companyId: createUserBoteria.companyId,
              }
            };

          await createUserService(user);

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
      }

      if(createUserBoteria.status === 422){
        return response.status(200).send(createUserBoteria);
      }
    } catch (error) {
      return response.json(error);
    }
  }
}

export default new CreateUserController();
