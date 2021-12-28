import Time from '../models/times';
import logger from '../utils/logger';

async function insertTitleTime(name, torney, year){

    const title = {
        name: torney,
        year: year
    }

    return Time.findOneAndUpdate({ name: name },
        { $push: { titles: title } }, { new: true })
        .then(() =>  logger.info(`Título inserido para o ${name}`))
        .catch(() => logger.error('Erro ao inserir título'))
    
}
  
export default insertTitleTime;