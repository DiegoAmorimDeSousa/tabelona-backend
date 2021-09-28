import userSchema from '../../../models/user';
import countMessagesUserBoteriaService from '../../../services/coutMessagesUserBoteria.service';
class CountMessagesBotController {
  async count(request, response) {
    try {
      const { email } = request.headers;

      const userEmail = await userSchema.find(
        { email: email },
      );

      let companyId = '';
      let dashboardToken = '';

      if(userEmail[0].boteria === undefined || userEmail[0].boteria.companyId === undefined) {
        userEmail[0].integrations.forEach(element => {
          if(element.name === 'boteria'){
            companyId = element.companyId;
            dashboardToken = element.dashboardToken;
          };
        })
      } else {
        companyId = userEmail[0].boteria.companyId;
        dashboardToken = userEmail[0].boteria.dashboardToken;
      }

      const countMessages = await countMessagesUserBoteriaService(companyId, dashboardToken);

      return response.json(countMessages);
    } catch (error) {
      return response.json(error);
    }
  }
}

export default new CountMessagesBotController();
