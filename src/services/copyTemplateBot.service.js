import { api_boteria_copy_template, template_id_nuvemshop, template_id_rd, api_boteria, key_boteria } from '../utils/config';
import logger from '../utils/logger';
import axios from 'axios';

async function copyTemplateBotService(objCopyTemplate, code) {

  const body = {
    "templateBotId": objCopyTemplate.origin === 'nuvemshop' ? template_id_nuvemshop : template_id_rd,
    "organizationId": objCopyTemplate.organizationId,
    "companyId": objCopyTemplate.companyId,
  }

  if(objCopyTemplate.origin === 'nuvemshop'){
    body.customValues = {
      "nomeEmpresa": objCopyTemplate.companyName
    }
  }

  const copyTemplate = await axios.post(api_boteria_copy_template, body).then(response => {

    axios.post(`${api_boteria}/bots/${response.data._id}/publish?key=${key_boteria}`, {
      isActive: true,
      isWebchatChannelActive: true,
      userId: objCopyTemplate.userId
    })

    if (objCopyTemplate.origin === 'rd') {
      axios.post(`${api_boteria}/bots/${response.data._id}/rd-station/auth?key=${key_boteria}`, {
        "code": code
      })
    }

    logger.info(`Copy bot success`);

    return response.data;

  }).catch(error => {
    logger.error(`Copy bot error: ${error.response.data}`);
    return error.response.data;
  })

  return copyTemplate;
}

export default copyTemplateBotService;
