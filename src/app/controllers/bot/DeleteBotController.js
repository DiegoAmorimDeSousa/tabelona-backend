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

      const getScript = await getScriptNuvemshopService(userEmail.userIdStore, userEmail.accessToken);

      if (getScript.length !== 0) {
        const deleteScript = await deleteScriptNuvemshopService(userEmail.userIdStore, userEmail.accessToken, getScript);
        return response.json(deleteScript);
      }


      return response.status(200);
    } catch (error) {
      return response.json(error);
    }
  }
}

export default new DeleteBotController();
