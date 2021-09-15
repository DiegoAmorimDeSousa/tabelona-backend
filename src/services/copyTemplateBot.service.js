import { api_boteria_copy_template, template_id_nuvemshop, template_id_rd, api_boteria, key_boteria } from '../utils/config';
import axios from 'axios';

async function copyTemplateBotService(companyId, organizationId, companyName, userId, origin) {

  const copyTemplate = await axios.post(api_boteria_copy_template, {
    "templateBotId": origin === 'nuvemshop' ? template_id_nuvemshop : template_id_rd,
    "organizationId": organizationId,
    "companyId": companyId,
    "customValues": {
      "nomeEmpresa": companyName
    }
  }).then(response => {
    axios.post(`${api_boteria}/bots/${response.data._id}/publish?key=${key_boteria}`, {
      isActive: true,
      isWebchatChannelActive: true,
      userId: userId
    })

    return response.data;

  }).catch(error => {
    return error.response.data;
  })

  return copyTemplate;
}

export default copyTemplateBotService;
