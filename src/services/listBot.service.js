import axios from 'axios';
import logger from '../utils/logger';
import { list_bot } from '../utils/config';

async function listBotService(token) {

  const listBot = await axios.get(list_bot, {
    headers: {
      authorization: 'Bearer' + ' ' + token,
    }
  })
    .then(result => {
      logger.info(`Get list bot success`);
      return result.data;
    }).catch(error => {
      logger.error(`Get list bot error: ${error.data}`);
      return error;
    })

  return listBot;
}

export default listBotService;
