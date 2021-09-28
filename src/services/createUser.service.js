import User from '../models/user';
import logger from '../utils/logger';

function createUserService(user){

  User(user)
      .save()
      .then(() => {
        logger.info('user created');
      })
      .catch(err => logger.error('ERROR CREATED: ', err));
}

export default createUserService;
