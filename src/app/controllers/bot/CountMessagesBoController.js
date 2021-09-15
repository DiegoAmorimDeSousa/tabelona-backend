import userSchema from '../../../models/user';
import countMessagesUserBoteriaService from '../../../services/coutMessagesUserBoteria.service';
class CountMessagesBotController {
  async count(request, response) {
    try {
      const { email } = request.headers;

      const userEmail = await userSchema.find(
        { email: email },
      );

      const countMessages = await countMessagesUserBoteriaService(userEmail[0].boteria.companyId, userEmail[0].boteria.dashboardToken);

      return response.json(countMessages);
    } catch (error) {
      return response.json(error);
    }
  }
}

export default new CountMessagesBotController();
