import userSchema from '../../../models/user';
import countDataService from '../../../services/countData.service';

class CountDataController {
  async count(request, response) {
    const { email } = request.headers;

    const userEmail = await userSchema.find({ "email": email });

    const end_date = new Date();

    let start_date = new Date();

    start_date.setDate(start_date.getDate() - 30);

    let tokenBoteria = '';

    if(userEmail[0].boteria === undefined) {
      userEmail[0].integrations.map(element => {
        if(element.name === 'boteria'){
          tokenBoteria = element.dashboardToken;
        };
      });
    } else {
      tokenBoteria = userEmail[0].boteria.dashboardToken;
    }

    const obj = {
      botId: userEmail[0].botPublish,
      token: tokenBoteria,
      startDate: start_date,
      endDate: end_date,
    }

    const countData = await countDataService(obj);

    return response.json(countData);
  }
}

export default new CountDataController();
