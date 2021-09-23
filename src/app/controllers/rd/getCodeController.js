import axios from 'axios';

class getCodeController {
    async getCode(request, response) {

        const { code } = request.query;

        axios.post(process.env.URL_RD_AUTH, {
            "client_id": process.env.CLIENT_ID_RD,
            "client_secret": process.env.CLIENT_SECRET_RD,
            "grant_type": "authorization_code",
            "code": code
        }).then(result => {
            response.redirect(`${process.env.URL_FRONT}/signin/rd/${result.data.refresh_token}/${result.data.access_token}/${code}`);
        }).catch(() => { });

        return response.status(200);
    }
}

export default new getCodeController();