import getSettingsService from '../../../services/getSettingsBot.service';

class GetSettingsBotController{
  async getSettings(request, response){
    try {
      const { botid, token } = request.headers;

      const getSettings = await getSettingsService(token ,botid);

      return response.json(getSettings.channels);
    } catch (error) {
      return response.json(error);
    }
  }
}

export default new GetSettingsBotController();
