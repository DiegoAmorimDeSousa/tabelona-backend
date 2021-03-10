import { api_boteria } from '../../../utils/config';

class ExtractMessagesBotController {
  async extract(request, response) {
    try {
      const { filter, dashboardtoken, botid } = request.headers;

      const end_date = new Date();

      let start_date = new Date();

      if(filter === '7'){
        start_date.setDate(start_date.getDate() - 7);
      } else {
        start_date.setDate(start_date.getDate() - 30);
      }

      return response.json(`${api_boteria}/dashboard/collect-data-csv?bot_id=${botid}&token=${dashboardtoken}&start_date=${start_date}&end_date=${end_date}`);
    } catch (error) {
      return response.json(error);
    }
  }
}

export default new ExtractMessagesBotController();
