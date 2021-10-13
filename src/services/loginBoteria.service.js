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
  let companyId;

  await axios.post(`${api_boteria}/auth/sign-in`, user)
    .then(result => {

      if (result.data.user.selectedCompany !== null) {
        companyId = result.data.user.selectedCompany._id;
      } else {
        companyId = result.data.user.companyId;
      }

      let dateCreationUser = result.data.user.dateCreation.split('T');

      if (result.data.user.selectedOrganization !== null) {
        organizationId = result.data.user.selectedOrganization;
      } else {

        result.data.user.organizations.map(element => {

          let dateCreationOrg = element.dateCreation.split('T');

          if (dateCreationUser[0] === dateCreationOrg[0]) {
            let minuteCreationUser = dateCreationUser[1].split(':');
            let minuteCreationOrg = dateCreationOrg[1].split(':');

            if (minuteCreationUser[0] === minuteCreationOrg[0]) {
              if (minuteCreationUser[1] === minuteCreationOrg[1])
                if (organizationId === undefined) {
                  organizationId = element._id;
                }
            }
          }
        })
      }

      loginUser.status = 200;
      loginUser.dashboardToken = result.data.user.dashboard_token;
      loginUser.companyId = companyId;
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
