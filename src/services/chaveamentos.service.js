import Time from '../models/times';
import logger from '../utils/logger';

async function chaveamentosService(copaDoBrasilArray, nameTorney){

    const RandomArray = copaDoBrasilArray.sort(()=> Math.random() - 0.5);

    RandomArray.map(async (element, index) => {

        await Time.findOneAndUpdate(
            { name: element },
            { $pull: { 'switching': {name: nameTorney }} }
            ).then(() =>  logger.info(`${nameTorney} removido para ${element}`))
            .catch(() => logger.error('Erro ao remover torneio'));

        if(nameTorney === 'Champions League'){
            await Time.findOneAndUpdate({ name: element },
                { $push: { switching: {
                    name: nameTorney,
                    moment: index + 1,
                    pontuation: 0,
                    games: 0,
                    wins: 0
                }}}, { new: true })
                .then(() =>  logger.info(`${nameTorney} inserido para ${element}`))
                .catch(() => logger.error('Erro ao inserir torneio'))
        } else {
            await Time.findOneAndUpdate({ name: element },
                { $push: { switching: {
                    name: nameTorney,
                    moment: index + 1,
                    score: ''
                }}}, { new: true })
                .then(() =>  logger.info(`${nameTorney} inserido para ${element}`))
                .catch(() => logger.error('Erro ao inserir torneio'))
        }
    })

}
  
export default chaveamentosService;