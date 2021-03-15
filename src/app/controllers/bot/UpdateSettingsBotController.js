import { get } from 'mongoose';
import getSettingsService from '../../../services/getSettingsBot.service';
import updateSettingsBotService from '../../../services/updateSettingsBot.service';
class UpdateSettingsBotControoler {
  async update(request, response){
    try {
      const
      { mainColor,
        secundaryColor,
        mainTextColor,
        secundaryTextColor,
        sizeBotIcon,
        botIcon,
        isActive,
        botId,
        token,
        headerName,
      } = request.body;

      const getSettings = await getSettingsService(token, botId);

      getSettings.channels.forEach(element => {
        if(element.channelId === 'WebChat'){
          element.settings.mainColor = mainColor;
          element.settings.secondaryColor = secundaryColor;
          element.settings.mainTextColor = mainTextColor;
          element.settings.secondaryTextColor = secundaryTextColor;
          element.settings.iconSize = sizeBotIcon;
          element.settings.botFab = botIcon;
          element.isActive = isActive;
          element.settings.headerName = headerName;
        }
      });

      await updateSettingsBotService(getSettings, botId, token);

      return response.json('success');
    } catch (error) {
      return response.json(error);
    }
  }
}

export default new UpdateSettingsBotControoler();
