import axios from 'axios';
import { api_boteria } from '../utils/config';

async function updateUserBoteria(code, userId, token) {

    const updateOrg = await axios.put(`${api_boteria}/users/${userId}`, {
        rdOAuthCode: code,
        _id: userId
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((response) => {
        return response.data
    }).catch(() => {
        return 'error update user'
    });

    return updateOrg;
}

export default updateUserBoteria;
