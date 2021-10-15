import { api_boteria, key_boteria } from '../utils/config';
import logger from '../utils/logger';
import axios from 'axios';

async function amountMessagesService(id) {

  const getAmountMessages = await axios.get(`${api_boteria}/companies/${id}?key=${key_boteria}`)
  .then(response => {

    let amountMessageUser = 0;

    response.data.plan.franchise.map(element => {
        amountMessageUser += element.amountMessage;
    })

    logger.info(`Get amount messages success: ${amountMessageUser}`);

    return amountMessageUser;

  }).catch(error => {
    logger.error(`Get amount messages error: ${error.response.data}`);
    return 0;
  })

  return getAmountMessages;
}

export default amountMessagesService;