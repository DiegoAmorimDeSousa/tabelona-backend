import userSchema from '../../../models/user';
import nuvemshopService from '../../../services/nuvemshop.service';
import getScriptNuvemshopService from '../../../services/getScriptNuvemshop.service';
import deleteScriptNuvemshopService from '../../../services/deleteScriptNuvemshop.service';

class PublishBotController {
  async publish(request, response) {
    try {
      const { botId, email } = request.body;

      const userEmail = await userSchema.findOneAndUpdate(
        {email: email},
        {botPublish: botId}
      );

      const getScript = await getScriptNuvemshopService(userEmail.userIdStore, userEmail.accessToken);

      if(getScript.length === 0){
        const publishi = await nuvemshopService(userEmail.userIdStore, userEmail.accessToken, botId);
        return response.json(publishi);
      } else {
        await deleteScriptNuvemshopService(userEmail.userIdStore, userEmail.accessToken, getScript);
        const publishi = await nuvemshopService(userEmail.userIdStore, userEmail.accessToken, botId);
        return response.json(publishi);
      }
    } catch (error) {
      return response.json(error);
    }
  }
}

export default new PublishBotController();
