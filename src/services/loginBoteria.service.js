import axios from 'axios';
import logger from '../utils/logger';
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

  let organizationId;

  await axios.post(`${api_boteria}/auth/sign-in`, user)
    .then(result => {

      let dateCreationUser = result.data.user.dateCreation.split('T');

      if (result.data.user.selectedOrganization !== undefined) {
        organizationId = result.data.user.selectedOrganization;
      } else {
        result.data.user.organizations.map(element => {

          let dateCreationOrg = element.dateCreation.split('T');

          if (dateCreationUser[0] === dateCreationOrg[0]) {
            let dateCreationUserTime = dateCreationUser[1].split('.');
            let dateCreationOrgTime = dateCreationOrg[1].split('.');

            if (dateCreationOrgTime[0] === dateCreationUserTime[0]) {
              if (organizationId === undefined) {
                organizationId = element._id;
              }
            }
          }
        })
      }

      loginUser.status = 200;
      loginUser.dashboardToken = result.data.user.dashboard_token;
      loginUser.companyId = result.data.user.selectedCompany._id;
      loginUser.userId = result.data.user._id;
      loginUser.organizationId = organizationId;
      loginUser.tokenBoteria = result.data.token;

      logger.info(`Login boteria success`);
    })
    .catch((err) => {
      logger.error(`Login boteria error: ${err}`);
      loginUser.status = 422
    });

  return loginUser;
}

export default loginBoteria;
