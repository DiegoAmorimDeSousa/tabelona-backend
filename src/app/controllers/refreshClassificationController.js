import insertTitleTimeService from '../../services/insertTitleTime.service';
import chaveamentosService from '../../services/chaveamentos.service';
import Time from '../../models/times';
import logger from '../../utils/logger';

class RefreshClassificationController {
    async refreshClassification(request, response) {
        try {
            const { times } = request.body;

            let positonBrasilA = 0;
            let positonBrasilB = 0;
            let positonMundoA = 0;
            let positonMundoB = 0;

            let copaDoBrasilArray = [];
            let copaMundialArray = [];
            let libertadoresArray = [];
            let championsArray = [];

            times.map(async (element) => {
                if(element.seriesType === 'A' && element.country === 'Brasil'){
                    positonBrasilA = positonBrasilA + 1;
                    
                    if(positonBrasilA === 1){
                        // await insertTitleTimeService(element.name, 'Série A - Brasil', new Date().getFullYear());
                    }

                    if(positonBrasilA < 7){
                        championsArray.push(element.name);
                    }

                    if(positonBrasilA > 6 && positonBrasilA < 14){
                        libertadoresArray.push(element.name);
                    }

                    let newSeriesTypeBrasilA = 'A';

                    if(positonBrasilA > 24){
                        newSeriesTypeBrasilA = 'B'
                    } 

                    copaDoBrasilArray.push(element.name);

                    await Time.findOneAndUpdate({ name: element.name },
                        { $push: { classification: {
                           pontuation: 0,
                           games: 0,
                           wins: 0,
                           year: Number(2022)
                       }, }, 
                          seriesType: newSeriesTypeBrasilA
                        }, 
                   { new: true })
                       .then(() => logger.info(`Pontuação do(a) ${element.name} atualizado(a)`))
                       .catch(() => logger.error(`Erro ao atualizar pontuação do(a) ${element.name}`))
                }

                if(element.seriesType === 'B' && element.country === 'Brasil'){
                    positonBrasilB = positonBrasilB + 1;
                    
                    if(positonBrasilB === 1){
                        // await insertTitleTimeService(element.name, 'Série B - Brasil', new Date().getFullYear());
                    }

                    if(positonBrasilB < 3){
                        copaDoBrasilArray.push(element.name);
                    }

                    let newSeriesTypeBrasilB = 'B';

                    if(positonBrasilB < 7){

                        newSeriesTypeBrasilB = 'A';
                    } else if(positonBrasilB > 24){
                        newSeriesTypeBrasilB = 'Sem série'
                    }

                    await Time.findOneAndUpdate({ name: element.name },
                        { $push: { classification: {
                           pontuation: 0,
                           games: 0,
                           wins: 0,
                           year: Number(2022)
                       }, }, 
                          seriesType: newSeriesTypeBrasilB
                        }, 
                   { new: true })
                       .then(() => logger.info(`Pontuação do(a) ${element.name} atualizado(a)`))
                       .catch(() => logger.error(`Erro ao atualizar pontuação do(a) ${element.name}`))
                }

                if(element.seriesType === 'A' && element.country === 'World'){
                    positonMundoA = positonMundoA + 1;
                    
                    if(positonMundoA === 1){
                        // await insertTitleTimeService(element.name, 'Série A - Mundo', new Date().getFullYear());
                    }

                    if(positonMundoA < 7){
                        championsArray.push(element.name);
                    }

                    if(positonMundoA > 6 && positonMundoA < 14){
                        libertadoresArray.push(element.name);
                    }

                    let newSeriesTypeMundoA = 'A';

                    if(positonMundoA > 24){

                        newSeriesTypeMundoA = 'B';
                    }

                    copaMundialArray.push(element.name);

                    await Time.findOneAndUpdate({ name: element.name },
                        { $push: { classification: {
                           pontuation: 0,
                           games: 0,
                           wins: 0,
                           year: Number(2022)
                       }, }, 
                          seriesType: newSeriesTypeMundoA
                        }, 
                   { new: true })
                       .then(() => logger.info(`Pontuação do(a) ${element.name} atualizado(a)`))
                       .catch(() => logger.error(`Erro ao atualizar pontuação do(a) ${element.name}`))

                }

                if(element.seriesType === 'B' && element.country === 'World'){
                    positonMundoB = positonMundoB + 1;
                    
                    if(positonMundoB === 1){
                        // await insertTitleTimeService(element.name, 'Série B - Mundo', new Date().getFullYear());
                    }

                    if(positonMundoB < 3){
                        copaMundialArray.push(element.name);
                    }

                    let newSeriesTypeMundoB = 'B';

                    if(positonMundoB < 7){

                        newSeriesTypeMundoB = 'A';
                    } else if(positonMundoB > 24){
                        newSeriesTypeMundoB = 'Sem série';
                    }

                    await Time.findOneAndUpdate({ name: element.name },
                        { $push: { classification: {
                           pontuation: 0,
                           games: 0,
                           wins: 0,
                           year: Number(2022)
                       }, }, 
                          seriesType: newSeriesTypeMundoB
                        }, 
                   { new: true })
                       .then(() => logger.info(`Pontuação do(a) ${element.name} atualizado(a)`))
                       .catch(() => logger.error(`Erro ao atualizar pontuação do(a) ${element.name}`))
                }
            });

            await chaveamentosService(copaDoBrasilArray, 'Copa do Brasil');
            await chaveamentosService(copaMundialArray, 'Copa Mundial');
            await chaveamentosService(libertadoresArray, 'Libertadores');
            await chaveamentosService(championsArray, 'Champions League');
            
            return response.status(200).json(times);
        } catch (error) {
            return response.status(400).json(error);
        }
    }
}

export default new RefreshClassificationController();