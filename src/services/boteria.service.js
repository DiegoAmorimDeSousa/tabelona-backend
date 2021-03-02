import axios from 'axios';
import { api_boteria } from '../utils/config';

async function boteriaService(user) {

  const objectUserBoteria = {
    user
  }

  console.log(api_boteria);

  const createUser = {};

  await axios.post(`${api_boteria}/auth/sign-up`, objectUserBoteria)
  .then((response) => {
    createUser.status = 200;
    createUser.message = 'user created';
    createUser.dashboardToken = response.data.dashboardToken;
    createUser.companyId = response.data.companyId;
    createUser.userId = response.data.userId;
  }).catch(err => {
    createUser.status = 422;
    createUser.message = 'error creates user';
    createUser.email = err.response.data.errors.keyValue.email;
  });

  return createUser;
}

export default boteriaService;
