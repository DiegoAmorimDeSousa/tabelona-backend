import axios from 'axios';
import { api_boteria } from '../utils/config';

async function loginBoteria(email, password, tokenReCaptcha) {

  const user = {
    tokenReCaptcha: tokenReCaptcha,
    user: {
      email: email,
      password: password,
    }
  }

  const loginUser = {};

  await axios.post(`${api_boteria}/auth/sign-in`, user)
    .then(result => {
      loginUser.status = 200;
      loginUser.dashboardToken = result.data.user.dashboard_token;
      loginUser.companyId = result.data.user.companyId;
      loginUser.userId = result.data.user._id;
      loginUser.organizationId = result.data.user.organizationIds[0];
      loginUser.tokenBoteria = result.data.token;
    })
    .catch(() => {
      loginUser.status = 422
    });

  return loginUser;
}

export default loginBoteria;
