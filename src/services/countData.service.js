import { api_boteria } from '../utils/config';
import axios from 'axios';

async function countData(obj) {
  const count = await axios.get(`${api_boteria}/dashboard/collect-data-count?bot_id=${obj.botId}&token=${obj.token}&start_date=${obj.startDate}&end_date=${obj.endDate}`)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.data;
    })

  return count
}

export default countData;
