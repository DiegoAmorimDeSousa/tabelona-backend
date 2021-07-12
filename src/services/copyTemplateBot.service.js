import { api_boteria_copy_template, template_id, api_boteria, key_boteria } from '../utils/config';
import axios from 'axios';

async function copyTemplateBotService(companyId, organizationId, companyName) {

  const copyTemplate = await axios.post(api_boteria_copy_template, {
    "templateBotId": template_id,
    "organizationId": organizationId,
    "companyId": companyId,
    "customValues": {
      "nomeEmpresa": companyName
    }
  }).then(response => {
    axios.post(`${api_boteria}/bots/${response.data._id}/publish?key=${key_boteria}`, {
      isActive: true,
      isWebchatChannelActive: true,
    })
    return response.data;
  }).catch(error => {
    return error.data;
  })

  return copyTemplate;
}

export default copyTemplateBotService;
