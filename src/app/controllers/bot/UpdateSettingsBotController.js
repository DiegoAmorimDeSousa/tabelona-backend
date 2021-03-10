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

      getSettings.channels[0].settings.mainColor = mainColor;
      getSettings.channels[0].settings.secondaryColor = secundaryColor;
      getSettings.channels[0].settings.mainTextColor = mainTextColor;
      getSettings.channels[0].settings.secondaryTextColor = secundaryTextColor;
      getSettings.channels[0].settings.iconSize = sizeBotIcon;
      getSettings.channels[0].settings.iconWebchat = botIcon;
      getSettings.channels[0].isActive = isActive;
      getSettings.channels[0].settings.headerName = headerName;

      await updateSettingsBotService(getSettings, botId, token);

      return response.json('success');
    } catch (error) {
      return response.json(error);
    }
  }
}

export default new UpdateSettingsBotControoler();
