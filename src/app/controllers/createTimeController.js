import createTimeService from '../../services/createTime.service';
import Time from '../../models/times';

class createTimeController {
    async createTime(request, response){
        try {
            const { time } = request.body;

            const timeSave = {
                name: time.name,
                state: '',
                seriesType: 'B',
                country: time.country,
                logo: time.logo,
                titles: [],
                initials: '',
                surname: '',
                switching: [],
                lastPosition: '',
                classification: [{
                    pontuation: 0,
                    games: 0,
                    wins: 0,
                    year: new Date().getFullYear()
                }]
            }

            const timeCreate = await Time.find({name: time.name});

            if(timeCreate.length > 0){
                Time.findOneAndUpdate({ name: time.name },
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
               .then(() => logger.info(`${time.name} Volta para a série B`))
               .catch(() => logger.error(`Erro ao atualizar ${element.name}`))
            } else {
                await createTimeService(timeSave);
            }

            const getTimes = await Time.find().sort({'name': 1});

            return response.status(200).json({
                success: true,
                message: 'Times selecionados com sucesso',
                times: getTimes
            });

        } catch (error) {
            return response.status(400).json({
                success: false,
                message: 'Erro ao cadastrar o time'
            });
        }
    }
}

export default new createTimeController();