import axios from 'axios';
import userSchema from '../../../models/user';

class ListBotController {
  async list(request, response){
    try {

      const { token, email } = request.headers;

      const userEmail = await userSchema.find({email: email});

      const userBotPublish = userEmail[0].botPublish;

      axios.get('https://api.testes.boteria.com.br/api/v1/bots', {
        headers: {
          authorization: 'Bearer' + ' ' + token,
        }
      }).then(result => {
        return response.json({result: result.data, botPublish: userBotPublish});
      }).catch(error => {
        return response.json(error);
      })

      return response.status(200);
    } catch (error) {
      return response.json(error);
    }
  }
}

export default new ListBotController();
