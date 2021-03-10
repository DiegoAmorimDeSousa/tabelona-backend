import axios from 'axios';
import { api_url_nuvemshop } from '../../../utils/config';

class GetEmailStoreController{
  async getEmail(request, response) {

    const { id_store, access_token } = request.headers;

    axios.get(`${api_url_nuvemshop}/v1/${id_store}/store`, {
      headers: {
        Authentication: 'bearer' + ' ' + access_token
      }
    }).then(res => {
      return response.json(res.data.email);
    })
  }
}

export default new GetEmailStoreController();
