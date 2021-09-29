import { url_front, client_secret, client_id, authorize_app } from '../../../utils/config';
import axios from 'axios';

class AuthorizeNuvemshopController {
  async authorize(request, response) {

    try {
      axios.post(authorize_app, {
        client_id: client_id,
        client_secret: client_secret,
        grant_type: "authorization_code",
        code: request.query.code
      }).then(result => {
        response.redirect(`https://${url_front}/signup/nuvemshop/${result.data.user_id}/${result.data.access_token}`);
      }).catch(err => {
        return response.json(err);
      });

    } catch (error) {
      return response.json(error);
    }
  }
}

export default new AuthorizeNuvemshopController();
