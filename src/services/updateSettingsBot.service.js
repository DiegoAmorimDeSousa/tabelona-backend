import axios from 'axios';
import logger from '../utils/logger';
import { list_bot, api_boteria, key_boteria } from '../utils/config';

async function updateSettingsBotService(settings, botid, token, userData) {

  let userId = '';

  if(userData.boteria === undefined) {
    userData.integrations.map(element => {
      if(element.name === 'boteria'){
        userId = element.userIdBoteria;
      }
    })
  } else {
    userId = userData.boteria.userIdBoteria
  }

  axios.put(`${list_bot}/update/${botid}`, {
    channels: settings.channels,
  },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + ' ' + token,
      }
    }
  ).then(() => {

    logger.info('Updated settings bot');

    axios.post(`${api_boteria}/bots/${botid}/publish?key=${key_boteria}`, {
      isActive: true,
      isWebchatChannelActive: true,
      userId: userId
    }).then(() => {
      logger.info('Bot published successfully');
    }).catch(() => {
      logger.error('Bot published error');
    })


  }).catch(() => logger.error('Error updated settings bot'));
}

export default updateSettingsBotService;
