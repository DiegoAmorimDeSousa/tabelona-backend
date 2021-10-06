import axios from 'axios';
import logger from '../utils/logger';
import { api_boteria } from '../utils/config';

async function boteriaService(user, tokenReCaptcha) {

  const objectUserBoteria = {
    tokenReCaptcha,
    user
  }

  const createUser = {};

  await axios.post(`${api_boteria}/auth/sign-up`, objectUserBoteria)
    .then((response) => {
      createUser.status = 200;
      createUser.message = 'user created';
      createUser.dashboardToken = response.data.dashboardToken;
      createUser.companyId = response.data.companyId;
      createUser.userId = response.data.userId;
      createUser.organizationId = response.data.organizationId;

      logger.info(`Created user boteria success`);
    }).catch(err => {
      createUser.status = 422;
      createUser.message = 'error creates user';
      createUser.error = err.response.data.errors;

      logger.error(`Created user boteria error: ${err.response.data.errors}`);
    });

  return createUser;
}

export default boteriaService;
