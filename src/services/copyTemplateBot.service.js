import { api_boteria_copy_template, template_id_nuvemshop, template_id_rd, api_boteria, key_boteria } from '../utils/config';
import axios from 'axios';

async function copyTemplateBotService(objCopyTemplate) {

  const copyTemplate = await axios.post(api_boteria_copy_template, {
    "templateBotId": objCopyTemplate.origin === 'nuvemshop' ? template_id_nuvemshop : template_id_rd,
    "organizationId": objCopyTemplate.organizationId,
    "companyId": objCopyTemplate.companyId,
    "customValues": {
      "nomeEmpresa": objCopyTemplate.companyName
    }
  }).then(response => {

    axios.post(`${api_boteria}/bots/${response.data._id}/publish?key=${key_boteria}`, {
      isActive: true,
      isWebchatChannelActive: true,
      userId: objCopyTemplate.userId
    })

    return response.data;

  }).catch(error => {
    return error.response.data;
  })

  return copyTemplate;
}

export default copyTemplateBotService;
