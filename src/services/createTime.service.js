import Time from '../models/times';
import logger from '../utils/logger';

function createTimeService(time){

    Time(time)
        .save()
        .then(() => {
          logger.info('time created');
        })
        .catch(err => logger.error('ERROR CREATED: ', err));
  }
  
  export default createTimeService;