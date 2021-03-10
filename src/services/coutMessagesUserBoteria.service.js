import { api_boteria } from '../utils/config';
import axios from 'axios';
import moment from 'moment';

async function countMessagesUserBoteria(companyId, token){

  const end_date = new Date();

  let start_date = new Date();

  start_date.setDate(start_date.getDate() - 30);

  const count = await axios.get(`
  ${api_boteria}/dashboard/company/messages/count?company=${companyId}&token=${token}&start_date=${start_date}&end_date=${end_date}`)
  .then(result => {
    if(result.data[0] === undefined){
      return 0
    } else {
      return result.data[0].count;
    }
  })
  .catch(error => {
    return error;
  })

  return count;
}

export default countMessagesUserBoteria;
