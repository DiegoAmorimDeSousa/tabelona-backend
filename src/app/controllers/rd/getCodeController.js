import axios from 'axios';
import { url_rd_auth, client_id_rd, client_secret_rd, url_front } from '../../../utils/config';

class getCodeController {
    async getCode(request, response) {

        const { code } = request.query;

        axios.post(url_rd_auth, {
            "client_id": client_id_rd,
            "client_secret": client_secret_rd,
            "grant_type": "authorization_code",
            "code": code
        }).then(result => {
            response.redirect(`https://${url_front}/signin/rd/${result.data.refresh_token}/${result.data.access_token}/${code}`);
        }).catch(() => { });

        return response.status(200);
    }
}

export default new getCodeController();