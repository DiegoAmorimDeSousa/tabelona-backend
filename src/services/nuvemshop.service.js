import axios from 'axios';
import { api_url, api_url_nuvemshop } from '../utils/config';

async function nuvemshopService(user_id, access_token, idBot) {

    const data = JSON.stringify({
        "src": `${api_url}/partner/bot/wid/${idBot}`,
        // "src": `https://${api_url}/partner/bot/wid/${idBot}`,
        "event": "onload",
        "where": "store"
    });

    const config = {
        method: 'post',
        url: `${api_url_nuvemshop}/v1/${user_id}/scripts`,
        headers: {
            'Authentication': `bearer ${access_token}`,
            'Content-Type': 'application/json'
        },
        data: data
    };

    const publish = await axios(config)
        .then(function (responsePost) {
            return JSON.stringify(responsePost.data);
        })
        .catch(function (error) {
            return error;
        });

    return publish;
}

export default nuvemshopService;
