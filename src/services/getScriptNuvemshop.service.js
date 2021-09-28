import axios from 'axios';
import logger from '../utils/logger';
import { api_url_nuvemshop } from '../utils/config';

async function getScriptNuvemshopService(userId, accessToken) {

  const config = {
    method: 'get',
    url: `${api_url_nuvemshop}/v1/${userId}/scripts`,
    headers: {
      'User-Agent': 'Teste_Code7 (diego.amorim@code7.com)',
      'Authentication': `bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  };

  const getScript = await axios(config)
  .then(function (responsePost) {
    logger.info(`Script in store nuvemshop: ${responsePost.data}`);
    return responsePost.data;
  })
  .catch(function (error) {
    logger.error(`Get script error: ${error.data}`);
    return error;
  });

  return getScript;
}

export default getScriptNuvemshopService;
