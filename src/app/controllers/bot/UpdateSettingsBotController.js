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
      } = request.body;

      console.log(request.body);

      return response.json('success');
    } catch (error) {
      return response.json(error);
    }
  }
}

export default new UpdateSettingsBotControoler();
