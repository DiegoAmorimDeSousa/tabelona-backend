import axios from 'axios';
import { api_boteria } from '../utils/config';

function extractMessagesBot(bot_id, token, start_date, end_date, tokenboteria) {

      console.log(tokenboteria);

      axios.get(
        `${api_boteria}dashboard/collect-data-csv?/bot_id=${bot_id}&token=${token}&start_date=${start_date}&end_date=${end_date}`,{
          headers: {
            authorization: 'Bearer' + ' ' + tokenboteria,
          }
        }
      ).then(response => {
        console.log(response);
      }).catch(error => {
        console.log(error);
      })
}

export default extractMessagesBot;
