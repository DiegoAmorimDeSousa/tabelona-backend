import logger from '../utils/logger';
import User from '../models/user';
import copyTemplateBotService from './copyTemplateBot.service';

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

  const objCopyTemplate = {};

  response.integrations.map(async (element) => {
    if (element.name === origin) {
      integrationExisting = true
    }

    if (element.name === 'boteria') {
      objCopyTemplate.companyId = element.companyId;
      objCopyTemplate.organizationId = element.organizationId;
      objCopyTemplate.userId = element.userIdBoteria;
      objCopyTemplate.companyName = response.companyName;
      objCopyTemplate.origin = origin;
    }
  });

  response.integrations.map(async (element) => {

    if (element.name === origin) {
      if (count === 0) {
        count = count + 1;
        if (origin === 'rd') {
          await User.updateOne({ email: email, "integrations.name": origin },
            {
              $set: {
                "integrations.$.code": code,
                "integrations.$.accessToken": accessToken,
                "integrations.$.refreshToken": refreshToken_rd,
              }
            }
          )
            .then(() => { logger.info('Updated integration user') })
            .catch(() => { logger.error('Error updating integration user') });
        } else if (origin === 'nuvemshop') {
          await User.updateOne({ email: email, "integrations.name": origin },
            {
              $set: {
                "integrations.$.userIdStore": userIdStore,
                "integrations.$.accessToken": accessToken,
              }
            }
          )
            .then(() => { logger.info('Updated integration user') })
            .catch(() => { logger.error('Error updating integration user') });
        }
      }

    } else {
      if (!integrationExisting) {
        if (count === 0) {

          count = count + 1;

          let copyTemplate = '';

          copyTemplate = await copyTemplateBotService(objCopyTemplate, code);

          let botPublished;

          if (copyTemplate === '' || copyTemplate._id === null || copyTemplate._id === 'null' || copyTemplate._id === '' || copyTemplate === undefined) {
            botPublished = 1
          } else {
            botPublished = copyTemplate._id;
          }

          updateIntegrations.templateBotId = 'copyTemplate';

          await User.updateOne({ email: email }, {
            $push: { integrations: updateIntegrations }
          }).then(() => { logger.info('User updated') })
            .catch(err => { logger.error(err) });
        }
      }
    }
  })

  if (response.integrations.length === 0) {

    let copyTemplate = '';

    copyTemplate = await copyTemplateBotService(objCopyTemplate, code);

    let botPublished;

    if (copyTemplate === '' || copyTemplate._id === null || copyTemplate._id === 'null' || copyTemplate._id === '' || copyTemplate === undefined) {
      botPublished = 1
    } else {
      botPublished = copyTemplate._id;
    }

    updateIntegrations.templateBotId = 'copyTemplate';

    await User.updateOne({ email: email }, {
      $push: { integrations: updateIntegrations }
    }).then(() => { logger.info('User updated') })
      .catch(err => { logger.error(err) })
  }

  return;
}

export default updateIntegrationUser;
