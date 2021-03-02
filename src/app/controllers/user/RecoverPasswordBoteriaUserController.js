import axios from 'axios';
import { recover_password_boteria } from '../../../utils/config';

class RecoverPasswordBoteriaUserController{
  async recoverPassword(request, response){
    try {

      const { email } = request.body;

      axios.post(recover_password_boteria, {
        email: email
      });

      return response.status(200);
    } catch (error) {
      return response.json(error);
    }
  }
}

export default new RecoverPasswordBoteriaUserController();
