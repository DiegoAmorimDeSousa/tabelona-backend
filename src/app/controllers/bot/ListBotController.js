import axios from 'axios';
import userSchema from '../../../models/user';
import listBotService from '../../../services/listBot.service';

class ListBotController {
  async list(request, response){
    try {

      const { token, email } = request.headers;

      const userEmail = await userSchema.find({email: email});

      const userBotPublish = userEmail[0].botPublish;

      const listBot = await listBotService(token);

      return response.json({result: listBot, botPublish: userBotPublish});
    } catch (error) {
      return response.json(error);
    }
  }
}

export default new ListBotController();
