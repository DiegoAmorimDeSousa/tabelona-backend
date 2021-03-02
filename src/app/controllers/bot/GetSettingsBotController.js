import listBotService from '../../../services/listBot.service';

class GetSettingsBotController{
  async getSettings(request, response){
    try {
      const { botid, token } = request.headers;

      const listBot = await listBotService(token);

      const settings = {};

      listBot.forEach(element => {
        if(element._id === botid){
         settings.mainColor =  element.channels[0].settings.mainColor;
         settings.secondaryColor =  element.channels[0].settings.secondaryColor;
         settings.mainTextColor =  element.channels[0].settings.mainTextColor;
         settings.secondaryTextColor =  element.channels[0].settings.secondaryTextColor;
         settings.headerName =  element.channels[0].settings.headerName;
         settings.iconSize =  element.channels[0].settings.iconSize;
         settings.botFab =  element.channels[0].settings.botFab;
         settings.sizeIconBot =  element.channels[0].settings.iconSize;
         settings.isActive =  element.channels[0].isActive;
        }
      });
      return response.json(settings);
    } catch (error) {
      return response.json(error);
    }
  }
}

export default new GetSettingsBotController();
