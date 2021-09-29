import logger from '../utils/logger';
import User from '../models/user';

async function updateIntegrationUser(email, origin, accessToken, code, userIdStore, refreshToken_rd, response) {

  const updateIntegrations = {};

  updateIntegrations.name = origin;
  updateIntegrations.accessToken = accessToken;

  code !== undefined ? updateIntegrations.code = code : '';
  code !== undefined ? updateIntegrations.redirectValue = 0 : '';
  userIdStore !== undefined ? updateIntegrations.userId = userIdStore : '';
  refreshToken_rd !== undefined ? updateIntegrations.refreshToken = refreshToken_rd : '';

  let count = 0;
  let integrationExisting = false;

  response.integrations.map(async (element) => {
    if(element.name === origin){
      integrationExisting = true
    }
  });

  response.integrations.map(async (element) => {
    if(element.name === origin){

      if(count === 0){
        count = count + 1;
        if(origin === 'rd'){
          await User.updateOne({ email: email, "integrations.name": origin },
          { $set: {
            "integrations.$.code" : code,
            "integrations.$.accessToken": accessToken,
            "integrations.$.refreshToken": refreshToken_rd,
          } }
          )
          .then(() => {logger.info('Updated integration user')})
          .catch(() => {logger.error('Error updating integration user')});
        } else if(origin === 'nuvemshop'){
          await User.updateOne({ email: email, "integrations.name": origin },
          { $set: {
            "integrations.$.userIdStore" : userIdStore,
            "integrations.$.accessToken": accessToken,
          } }
          )
          .then(() => {logger.info('Updated integration user')})
          .catch(() => {logger.error('Error updating integration user')});
        }
      }

    } else {
      if(!integrationExisting){
        if(count === 0){
          count = count + 1;
          await User.updateOne({email: email}, {
            $push: {integrations: updateIntegrations}
          }).then(() => {logger.info('User updated')})
          .catch(err => {logger.error(err)});
        }
      }
    }
  })

  return;
}

export default updateIntegrationUser;
