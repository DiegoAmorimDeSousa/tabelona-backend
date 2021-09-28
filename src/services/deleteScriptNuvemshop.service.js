import axios from 'axios';
import logger from '../utils/logger';
import { api_url_nuvemshop } from '../utils/config';

function deleteScripNuvemshopService(userId, accessToken, scriptId) {

  scriptId.forEach(async (element) => {
    const config = {
      method: 'delete',
      url: `${api_url_nuvemshop}/v1/${userId}/scripts/${element.id}`,
      headers: {
        'User-Agent': 'Teste_Code7 (diego.amorim@code7.com)',
        'Authentication': `bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    };

    const deleteScript = await axios(config)
      .then(function (responsePost) {
        logger.info(`Delete script in store success`);
        return JSON.stringify(responsePost.data);
      })
      .catch(function (error) {
        logger.error(`Delete script in store error`);
        return error;
      });

    return deleteScript;
  });
}

export default deleteScripNuvemshopService;
