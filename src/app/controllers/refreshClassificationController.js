import insertTitleTimeService from '../../services/insertTitleTime.service';
import chaveamentosService from '../../services/chaveamentos.service';
import configTableService from '../../services/configTable.service';
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

            const timesArray = await configTableService(times);

            timesArray.map(async (element) => {
                if(element.seriesType === 'A' && element.country === 'Brasil'){
                    positonBrasilA = positonBrasilA + 1;

                    if(positonBrasilA < 7){
                        championsArray.push(element.name);
                    }

                    if(positonBrasilA > 6 && positonBrasilA < 14){
                        libertadoresArray.push(element.name);
                    }

                    if(positonBrasilA < 25){
                        Time.findOneAndUpdate({ name: element.name },
                        { $push: { classification: {
                            pontuation: 0,
                            games: 0,
                            wins: 0,
                            year: new Date().getFullYear(),
                            series: 'A'
                        }, }, 
                            seriesType: 'A'
                        }, 
                        { new: true })
                        .then(() => logger.info(`${element.name} Fica na série A`))
                        .catch(() => logger.error(`Erro ao atualizar ${element.name}`))

                        if(positonBrasilA === 1){
                            await insertTitleTimeService(element.name, 'Série A - Brasil', new Date().getFullYear());
                        }
                    } else {
                        Time.findOneAndUpdate({ name: element.name },
                            { $push: { classification: {
                            pontuation: 0,
                            games: 0,
                            wins: 0,
                            year: new Date().getFullYear(),
                            series: 'B'
                        }, }, 
                          seriesType: 'B'
                        }, 
                        { new: true })
                       .then(() => logger.info(`${element.name} Cai para a série B`))
                       .catch(() => logger.error(`Erro ao atualizar ${element.name}`))
                    }
                    copaDoBrasilArray.push(element.name);
                }

                if(element.seriesType === 'B' && element.country === 'Brasil'){
                    positonBrasilB = positonBrasilB + 1;

                    if(positonBrasilB < 3){
                        copaDoBrasilArray.push(element.name);
                    }

                    if(positonBrasilB < 7){
                        Time.findOneAndUpdate({ name: element.name },
                        { $push: { classification: {
                           pontuation: 0,
                           games: 0,
                           wins: 0,
                           year: new Date().getFullYear(),
                           series: 'A'
                       }, }, 
                          seriesType: 'A'
                        }, 
                        { new: true })
                       .then(() => logger.info(`${element.name} Sobe para a série A`))
                       .catch(() => logger.error(`Erro ao atualizar ${element.name}`))

                        if(positonBrasilB === 1){
                            await insertTitleTimeService(element.name, 'Série B - Brasil', new Date().getFullYear());
                        }
                    } else if(positonBrasilB > 24) {
                        Time.findOneAndUpdate({ name: element.name },
                            { $push: { classification: {
                            pontuation: 0,
                            games: 0,
                            wins: 0,
                            year: new Date().getFullYear(),
                            series: 'Sem divisão'
                        }, }, 
                          seriesType: 'Sem divisão'
                        }, 
                        { new: true })
                       .then(() => logger.info(`${element.name} Fica sem divisão`))
                       .catch(() => logger.error(`Erro ao atualizar ${element.name}`))
                    } else {
                        Time.findOneAndUpdate({ name: element.name },
                            { $push: { classification: {
                               pontuation: 0,
                               games: 0,
                               wins: 0,
                               year: new Date().getFullYear(),
                               series: 'B'
                           }, }, 
                              seriesType: 'B'
                            }, 
                            { new: true })
                           .then(() => logger.info(`${element.name} Fica na série B`))
                           .catch(() => logger.error(`Erro ao atualizar ${element.name}`))
                    }
                }

                if(element.seriesType === 'A' && element.country === 'World'){
                    positonMundoA = positonMundoA + 1;
                    
                    if(positonMundoA < 7){
                        championsArray.push(element.name);
                    }

                    if(positonMundoA > 6 && positonMundoA < 14){
                        libertadoresArray.push(element.name);
                    }

                    copaMundialArray.push(element.name);

                    if(positonMundoA < 25){
                        Time.findOneAndUpdate({ name: element.name },
                        { $push: { classification: {
                           pontuation: 0,
                           games: 0,
                           wins: 0,
                           year: new Date().getFullYear(),
                           series: 'A'
                       }, }, 
                          seriesType: 'A'
                        }, 
                        { new: true })
                       .then(() => logger.info(`${element.name} Fica na série A`))
                       .catch(() => logger.error(`Erro ao atualizar ${element.name}`))

                        if(positonMundoA === 1){
                            await insertTitleTimeService(element.name, 'Série A - Mundo', new Date().getFullYear());
                        }
                    } else {
                        await Time.findOneAndUpdate({ name: element.name },
                            { $push: { classification: {
                            pontuation: 0,
                            games: 0,
                            wins: 0,
                            year: new Date().getFullYear(),
                            series: 'B'
                        }, }, 
                          seriesType: 'B'
                        }, 
                        { new: true })
                       .then(() => logger.info(`${element.name} Cai para a série B`))
                       .catch(() => logger.error(`Erro ao atualizar ${element.name}`))
                    }
                }

                if(element.seriesType === 'B' && element.country === 'World'){
                    positonMundoB = positonMundoB + 1;

                    if(positonMundoB < 3){
                        copaMundialArray.push(element.name);
                    }

                    if(positonMundoB < 7){
                        Time.findOneAndUpdate({ name: element.name },
                        { $push: { classification: {
                           pontuation: 0,
                           games: 0,
                           wins: 0,
                           year: new Date().getFullYear(),
                           series: 'A'
                       }, }, 
                          seriesType: 'A'
                        }, 
                        { new: true })
                       .then(() => logger.info(`${element.name} Sobe para a série A`))
                       .catch(() => logger.error(`Erro ao atualizar ${element.name}`))

                        if(positonMundoB === 1){
                            await insertTitleTimeService(element.name, 'Série B - Mundo', new Date().getFullYear());
                        }
                    } else if(positonMundoB > 24) {
                        Time.findOneAndUpdate({ name: element.name },
                            { $push: { classification: {
                            pontuation: 0,
                            games: 0,
                            wins: 0,
                            year: new Date().getFullYear(),
                            series: 'Sem divisão'
                        }, }, 
                          seriesType: 'Sem divisão'
                        }, 
                        { new: true })
                       .then(() => logger.info(`${element.name} Fica sem divisão`))
                       .catch(() => logger.error(`Erro ao atualizar ${element.name}`))
                    } else {
                        Time.findOneAndUpdate({ name: element.name },
                            { $push: { classification: {
                            pontuation: 0,
                            games: 0,
                            wins: 0,
                            year: new Date().getFullYear(),
                            series: 'B'
                        }, }, 
                          seriesType: 'B'
                        }, 
                        { new: true })
                       .then(() => logger.info(`${element.name} Fica na série B`))
                       .catch(() => logger.error(`Erro ao atualizar ${element.name}`))
                    }
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