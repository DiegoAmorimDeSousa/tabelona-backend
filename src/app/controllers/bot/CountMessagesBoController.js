import userSchema from '../../../models/user';
import moment from 'moment';
import listBotService from '../../../services/listBot.service';

class CountMessagesBotController{
  async count(request, response){
    try {
      const { email, token } = request.headers;

      const listBot = await listBotService(token);

      console.log(listBot[0]);

      const userEmail = await userSchema.find(
        {email: email},
      );

    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    // }
      return response.json('teste');
    } catch (error) {
      return response.json(error);
    }
  }
}

export default new CountMessagesBotController();
