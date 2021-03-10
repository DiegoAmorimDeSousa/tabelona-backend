import axios from 'axios';
import { list_bot } from '../utils/config';

async function getSettings(token, bot){

  const listBot = await axios.get(`${list_bot}/${bot}`, {
    headers: {
      authorization: 'Bearer' + ' ' + token,
    }
  }).then(result => {
    return result.data;
  }).catch(error => {
    return error;
  })

  return listBot;
}

export default getSettings;
