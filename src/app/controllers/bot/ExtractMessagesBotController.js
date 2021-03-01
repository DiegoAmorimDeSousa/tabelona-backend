import extractMessagesBotService from '../../../services/extractMessagesBot.service';

class ExtractMessagesBotController {
  async extract(request, response) {
    try {
      const { filter, dashboardtoken, botid, tokenboteria } = request.headers;

      const start_date = new Date();

      let end_date = new Date();

      if(filter === '7'){
        end_date.setDate(end_date.getDate() - 7);
      } else {
        end_date.setDate(end_date.getMonth() - 1);
      }

      extractMessagesBotService(botid, dashboardtoken, start_date, end_date, tokenboteria);
      return response.json('');
    } catch (error) {
      return response.json(error);
    }
  }
}

export default new ExtractMessagesBotController();
