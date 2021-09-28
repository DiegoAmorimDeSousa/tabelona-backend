import axios from 'axios';
import logger from '../utils/logger';
import { list_bot } from '../utils/config';

async function getSettings(token, bot) {

  const listBot = await axios.get(`${list_bot}/${bot}`, {
    headers: {
      authorization: 'Bearer' + ' ' + token,
    }
  }).then(result => {
    logger.info(`Get settings success`);
    return result.data;
  }).catch(error => {
    logger.error(`Get settings error: ${error.data}`);
    return error;
  })

  return listBot;
}

export default getSettings;
