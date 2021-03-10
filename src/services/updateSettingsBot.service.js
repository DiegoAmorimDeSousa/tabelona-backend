import axios from 'axios';
import { list_bot } from '../utils/config';

async function updateSettingsBotService(settings, botid, token){

  axios.put(`${list_bot}/update/${botid}`, {
    channels: settings.channels,
  },
  {
    headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer' + ' ' + token,
  }}
  ).then(result => {
    console.log(result);
  }).catch(error => {
    console.log(error);
  })
}

export default updateSettingsBotService;
