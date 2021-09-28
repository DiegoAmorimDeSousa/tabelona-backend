import { api_boteria } from '../utils/config';
import logger from '../utils/logger';
import axios from 'axios';

async function countData(obj) {
  const count = await axios.get(`${api_boteria}/dashboard/collect-data-count?bot_id=${obj.botId}&token=${obj.token}&start_date=${obj.startDate}&end_date=${obj.endDate}`)
    .then(response => {
      logger.info(`Extract messages success`);
      return response.data;
    })
    .catch(err => {
      logger.error(`Extract messages error - ${err.data}`);
      return err.data;
    })

  return count
}

export default countData;
