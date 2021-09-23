import axios from 'axios';
import { api_boteria } from '../utils/config';

async function updateOrgUserBoteria(code, organizationId, token) {

    const updateOrg = await axios.put(`${api_boteria}/companies/organization/${organizationId}`, {
        rdOAuthCode: code,
        _id: organizationId
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((response) => {
        return response.data
    }).catch(() => {
        return 'error update org'
    });

    return updateOrg;
}

export default updateOrgUserBoteria;
