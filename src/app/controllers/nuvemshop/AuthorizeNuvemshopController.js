import { url_front, client_secret, client_id, authorize_app, api_url_nuvemshop } from '../../../utils/config';
import axios from 'axios';

class AuthorizeNuvemshopController {
  async authorize(request, response){
    try {
      axios.post(authorize_app, {
        client_id: client_id,
        client_secret: client_secret,
        grant_type:"authorization_code",
        code: request.query.code
        }).then(result => {

          // console.log(api_url_nuvemshop);
          // console.log(client_id);
          // console.log(result.data.access_token);

          // const config = {
          //   method: 'get',
          //   url: `${api_url_nuvemshop}/v1/${client_id}/scripts`,
          //   headers: {
          //     'User-Agent': 'Teste_Code7 (diego.amorim@code7.com)',
          //     'Authentication': `bearer ${result.data.access_token}`,
          //     'Content-Type': 'application/json'
          //   },
          // };

          // console.log(config);

          // axios(config)
          // .then(function (responsePost) {
          //  console.log(responsePost);
          // })
          // .catch(function (error) {
          //   console.log(error);
          // });

          response.redirect(`${url_front}/id/${result.data.user_id}/token/${result.data.access_token}`);
        }).catch(err => {
          return response.json(err);
        })
    } catch (error) {
      return response.json(error);
    }
  }
}

export default new AuthorizeNuvemshopController();
