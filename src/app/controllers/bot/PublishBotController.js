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

      let userIdStore = ''
      let accessToken = ''

      if(userEmail.userIdStore === undefined) {
          for (let i = 0; i < userEmail.integrations.length; i++) {
            const element = userEmail.integrations[i];
            if(element.name === 'nuvemshop'){
              userIdStore = element.userIdStore;
              accessToken = element.accessToken;
            }
          }
      } else {
        userIdStore = userEmail.userIdStore;
        accessToken = userEmail.accessToken
      }

      const getScript = await getScriptNuvemshopService(userIdStore, accessToken);

      if(getScript.length === 0){
        const publishi = await nuvemshopService(userIdStore, accessToken, botId);
        return response.json(publishi);
      } else {
        await deleteScriptNuvemshopService(userIdStore, accessToken, getScript);
        const publishi = await nuvemshopService(userIdStore, accessToken, botId);
        return response.json(publishi);
      }
    } catch (error) {
      return response.json(error);
    }
  }
}

export default new PublishBotController();
