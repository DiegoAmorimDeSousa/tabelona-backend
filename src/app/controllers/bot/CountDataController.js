import userSchema from '../../../models/user';
import countDataService from '../../../services/countData.service';

class CountDataController {
  async count(request, response){
    const { email } = request.headers;

    const userEmail = await userSchema.find({"email": email});

    const end_date = new Date();

    let start_date = new Date();

    start_date.setDate(start_date.getDate() - 30);

    const obj = {
      botId: userEmail[0].botPublish,
      token: userEmail[0].boteria.dashboardToken,
      startDate: start_date,
      endDate: end_date,
    }

    const countData = await countDataService(obj);

    return response.json(countData);
  }
}

export default new CountDataController();
