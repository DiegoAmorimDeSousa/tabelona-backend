import userSchema from '../../../models/user';
import getScriptNuvemshopService from '../../../services/getScriptNuvemshop.service';
import deleteScriptNuvemshopService from '../../../services/deleteScriptNuvemshop.service';

class DeleteBotController {
  async delete(request, response) {
    try {
      const { email } = request.body;

      const userEmail = await userSchema.findOneAndUpdate(
        { email: email },
        { botPublish: 1 }
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

      if (getScript.length !== 0) {
        const deleteScript = await deleteScriptNuvemshopService(userIdStore, accessToken, getScript);
        return response.json(deleteScript);
      }

      return response.status(200);
    } catch (error) {
      return response.json(error);
    }
  }
}

export default new DeleteBotController();
