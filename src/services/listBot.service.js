import axios from 'axios';
import { list_bot, key_boteria } from '../utils/config';

async function listBotService(token) {

  const listBot = await axios.get(list_bot, {
    headers: {
      authorization: 'Bearer' + ' ' + token,
    }
  })
    .then(result => {
      return result.data;
    }).catch(error => {
      return error;
    })

  return listBot;
}

export default listBotService;
